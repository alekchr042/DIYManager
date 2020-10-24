using DIYManager.Models.Implementation;
using DIYManager.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DIYManager.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ProjectsDetailsController : ControllerBase
    {
        private readonly IProjectDetailsService projectDetailsService;

        public ProjectsDetailsController(IProjectDetailsService projectDetailsService)
        {
            this.projectDetailsService = projectDetailsService;
        }

        [HttpGet]
        [Route("getdetails/{projectId}")]
        public ActionResult<ProjectDetails> GetDetails(string projectId)
        {
            var projectDetails = projectDetailsService.GetAllForProject(projectId);

            return Ok(projectDetails);
        }
    }
}
