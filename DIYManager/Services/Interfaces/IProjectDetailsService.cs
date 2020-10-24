using DIYManager.Models.Implementation;
using System.Collections.Generic;

namespace DIYManager.Services.Interfaces
{
    public interface IProjectDetailsService : IBasicService<ProjectDetails>
    {
        ProjectDetails GetAllForProject(string projectId);
    }
}
