using DIYManager.Models.DTO;
using DIYManager.Models.Implementation;
using DIYManager.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

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

        [HttpPost]
        [Route("AddNewProject")]
        public ActionResult<Project> AddNewProject([FromBody]NewProjectDTO newProjectDTO)
        {
            var newProject = projectService.Add(new Project(newProjectDTO));

            return newProject;
        }
    }
}
