using DIYManager.Models.DTO;
using DIYManager.Models.Implementation;
using System.Collections.Generic;

namespace DIYManager.Services.Interfaces
{
    public interface IResourceService : IBasicService<Resource>
    {
        IEnumerable<Resource> GetAllForProject(object parameter);

        IEnumerable<ResourceDTO> GetAllDtosForProject(object parameter);
    }
}
