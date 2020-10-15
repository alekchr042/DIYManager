using DIYManager.Models.Implementation;
using System.Collections.Generic;

namespace DIYManager.Services.Interfaces
{
    public interface IProjectService : IBasicService<Project>
    {
        IEnumerable<Project> GetAllByUser(string id);
    }
}
