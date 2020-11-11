using DIYManager.Models.Implementation;
using System.Collections.Generic;

namespace DIYManager.Services.Interfaces
{
    public interface IStepService : IBasicService<Step>
    {
        IEnumerable<Step> GetAllForProject(object parameter);
    }
}
