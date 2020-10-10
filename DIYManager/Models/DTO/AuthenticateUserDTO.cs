using System.ComponentModel.DataAnnotations;

namespace DIYManager.Models.DTO
{
    public class AuthenticateUserDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
