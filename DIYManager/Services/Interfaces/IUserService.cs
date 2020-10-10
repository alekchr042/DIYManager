using DIYManager.Models.Implementation;
using DIYManager.Models.Interfaces;

namespace DIYManager.Services.Interfaces
{
    public interface IUserService : IBasicService<User>
    {
        User Authenticate(string username, string password);

        User Create(User newUser, string password);
    }
}
