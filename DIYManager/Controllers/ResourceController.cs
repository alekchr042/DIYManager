using DIYManager.Models.Implementation;
using DIYManager.Services.Implementation;
using DIYManager.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIYManager.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ResourceController : ControllerBase
    {
        private readonly IResourceService resourceService;

        public ResourceController(IResourceService resourceService)
        {
            this.resourceService = resourceService;
        }

        [HttpGet]
        [Route("GetAllForProject/{projectId}")]
        public ActionResult<IEnumerable<Resource>> GetAllForProject(string projectId)
        {
            var projects = resourceService.GetAllDtosForProject(projectId);

            return Ok(projects);
        }
    }
}
