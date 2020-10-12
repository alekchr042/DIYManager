using DIYManager.Models.Implementation;
using DIYManager.Models.Interfaces;
using DIYManager.Services.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace DIYManager.Services.Implementation
{
    public class ProjectService : IProjectService
    {
        private readonly IMongoCollection<Project> projects;

        public ProjectService(IDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);

            var database = client.GetDatabase(databaseSettings.DatabaseName);

            projects = database.GetCollection<Project>("Project");
        }

        public Project Add(Project newObject)
        {
            projects.InsertOne(newObject);

            return newObject;
        }

        public void Delete(Project objectToDelete)
        {
            throw new NotImplementedException();
        }

        public Project Get(object parameter)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Project> GetAll()
        {
            var result = projects.Find(x => true).ToEnumerable();

            return result;
        }

        public void Update(Project objectToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
