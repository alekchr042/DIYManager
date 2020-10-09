using DIYManager.Models.Implementation;
using DIYManager.Models.Interfaces;
using DIYManager.Services.Interfaces;
using MongoDB.Driver;
using System.Collections.Generic;

namespace DIYManager.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> users;

        public UserService(IDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);

            var database = client.GetDatabase(databaseSettings.DatabaseName);

            users = database.GetCollection<User>("User");
        }

        public void Add(User newObject)
        {
            throw new System.NotImplementedException();
        }

        public void Delete(User objectToDelete)
        {
            throw new System.NotImplementedException();
        }

        public User Get(object parameter)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            var result = users.Find(x => true).ToEnumerable();
            return result;
        }

        public void Update(User objectToUpdate)
        {
            throw new System.NotImplementedException();
        }
    }
}
