using DIYManager.Models.DTO;
using DIYManager.Models.Implementation;
using DIYManager.Models.Interfaces;
using DIYManager.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DIYManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        private readonly IAppSettings appSettings;

        public UserController(IUserService userService,
            IAppSettings appSettings)
        {
            this.userService = userService;

            this.appSettings = appSettings;
        }

        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            var users = userService.GetAll();

            return Ok(users);
        }

        [HttpGet("{number}")]
        public ActionResult<User> Get(int number)
        {
            var user = userService.Get(number);

            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        [Route("CreateNewUser")]
        [AllowAnonymous]
        public ActionResult<User> CreateNewUser([FromBody]RegisterUserDTO registerUserDTO)
        {
            var newUser = new User(registerUserDTO);

            var createdUser = userService.Create(newUser, registerUserDTO.Password);

            if (createdUser != null)
                return Ok(createdUser);
            else return BadRequest();
        }

        [HttpPost]
        [Route("AuthenticateUser")]
        [AllowAnonymous]
        public ActionResult<User> AuthenticateUser([FromBody]AuthenticateUserDTO authenticateUserDTO)
        {
            var user = userService.Authenticate(authenticateUserDTO.Username, authenticateUserDTO.Password);

            if (user == null)
                return BadRequest();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                user.Id,
                user.Username,
                user.Name,
                Token = tokenString
            });
        }
    }
}
