using DIYManager.Models.DTO;
using DIYManager.Models.Implementation;
using DIYManager.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

namespace DIYManager.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IUserService userService;

        private readonly IProjectService projectService;

        public ProjectsController(IUserService userService,
            IProjectService projectService)
        {
            this.userService = userService;

            this.projectService = projectService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Project>> Get()
        {
            var projects = projectService.GetAll();

            return Ok(projects);
        }

        [HttpGet]
        [Route("{userId}")]
        public ActionResult<IEnumerable<Project>> Get(string userId)
        {
            var projects = projectService.GetAllByUser(userId);

            return Ok(projects);
        }

        [HttpPost]
        [Route("AddNewProject")]
        public ActionResult<Project> AddNewProject([FromForm]NewProjectDTO newProjectDTO)
        {
            var newProject = new Project(newProjectDTO);

            var owner = userService.Get(newProjectDTO.OwnerId);

            newProject.Owner = owner;

            using (var stream = new  MemoryStream())
            {
                newProjectDTO.File.CopyTo(stream);

                var fileContent = stream.ToArray();

                newProject.Thumbnail = Convert.ToBase64String(fileContent);
            }
            return projectService.Add(newProject);
        }
    }
}
