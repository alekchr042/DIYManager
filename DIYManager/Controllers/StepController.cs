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
    public class StepController : ControllerBase
    {
        private readonly IStepService stepService;
        public StepController(IStepService stepService)
        {
            this.stepService = stepService;
        }

        [HttpPost]
        [Route("AddNewStep")]
        public ActionResult<Resource> AddNewResource([FromBody] Step newStep)
        {
            var newResource = stepService.Add(newStep);

            return Ok(newResource);
        }

        [HttpGet]
        [Route("GetAllForProject/{projectId}")]
        public ActionResult<IEnumerable<Step>> GetAllForProject(string projectId)
        {
            var projects = stepService.GetAllForProject(projectId);

            return Ok(projects);
        }

        [HttpPost]
        [Route("UpdateStep")]
        public ActionResult UpdateResource([FromBody] Step stepToUpdate)
        {
            stepService.Update(stepToUpdate);

            return Ok();
        }
    }
}
