using DIYManager.Helpers;
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
        [Route("Get/{projectId}")]
        public ActionResult<Project> GetById(string projectId)
        {
            var project = projectService.Get(projectId);

            return Ok(project);
        }

        [HttpGet]
        [Route("{userId}")]
        public ActionResult<IEnumerable<Project>> Get(string userId)
        {
            var projects = projectService.GetAllByUser(userId);

            return Ok(projects);
        }

        [HttpGet]
        [Route("Delete/{projectId}")]
        public ActionResult Delete(string projectId)
        {
            projectService.Delete(projectId);

            return Ok();
        }

        [HttpPost]
        [Route("AddNewProject")]
        public ActionResult<Project> AddNewProject([FromForm]NewProjectDTO newProjectDTO)
        {
            var newProject = new Project(newProjectDTO);

            var owner = userService.Get(newProjectDTO.OwnerId);

            newProject.Owner = owner;

            if (newProjectDTO.File != null)
            {

                using (var stream = new MemoryStream())
                {
                    newProjectDTO.File.CopyTo(stream);

                    var fileContent = stream.ToArray();

                    newProject.Thumbnail = Convert.ToBase64String(fileContent);
                }
            }
            return projectService.Add(newProject);
        }

        [HttpPost]
        [Route("UpdateProject")]
        public ActionResult UpdateProject([FromForm] UpdateProjectDTO updateProjectDTO)
        {
            if (updateProjectDTO != null)
            {
                var owner = userService.Get(updateProjectDTO.OwnerId);

                var project = new Project(updateProjectDTO, owner);

                projectService.Update(project);
            }

            return Ok();
        }
    }
}
