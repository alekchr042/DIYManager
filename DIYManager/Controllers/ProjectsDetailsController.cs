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
        [Route("getdetailsforproject/{projectId}")]
        public ActionResult<ProjectDetails> GetDetails(string projectId)
        {
            var projectDetails = projectDetailsService.GetAllForProject(projectId);

            return Ok(projectDetails);
        }

        [HttpGet]
        [Route("getdetailsbyid/{projectDetailsId}")]
        public ActionResult<ProjectDetails> GetDetailsById(string projectDetailsId)
        {
            var projectDetails = projectDetailsService.Get(projectDetailsId);

            return Ok(projectDetails);
        }

        [HttpPost]
        [Route("update")]
        public ActionResult UpdateProjectDetails([FromBody] ProjectDetails detailsToUpdate)
        {
            projectDetailsService.Update(detailsToUpdate);

            return Ok();
        }
    }
}
