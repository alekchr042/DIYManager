using DIYManager.Helpers;
using DIYManager.Models.DTO;
using DIYManager.Models.Enums;
using DIYManager.Models.Implementation;
using DIYManager.Services.Implementation;
using DIYManager.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
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

        [HttpGet]
        [Route("GetResourceTypes")]
        public ActionResult<IDictionary<int, string>> GetResourceTypes()
        {
            var resourceTypes = EnumHelper.GetDictionaryFromEnum<ResourceType>();

            return Ok(resourceTypes);
        }

        [HttpPost]
        [Route("AddNewResource")]
        public ActionResult<Resource> AddNewResource([FromBody] ResourceDTO newResourceDTO)
        {
            var resourceToAdd = new Resource(newResourceDTO);

            var newResource = resourceService.Add(resourceToAdd);

            return Ok(newResource);
        }

        [HttpPost]
        [Route("UpdateResource")]
        public ActionResult UpdateResource([FromBody] ResourceDTO resourceToUpdateDTO)
        {
            var resourceToUpdate = new Resource(resourceToUpdateDTO);

            resourceService.Update(resourceToUpdate);

            return Ok();
        }
    }
}
