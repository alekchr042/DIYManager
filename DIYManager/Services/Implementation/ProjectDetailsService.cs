using DIYManager.Models.Implementation;
using DIYManager.Models.Interfaces;
using DIYManager.Services.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace DIYManager.Services.Implementation
{
    public class ProjectDetailsService : IProjectDetailsService
    {
        private readonly IMongoCollection<ProjectDetails> projectDetails;
        public ProjectDetailsService(IDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);

            var database = client.GetDatabase(databaseSettings.DatabaseName);

            projectDetails = database.GetCollection<ProjectDetails>("ProjectDetails");
        }
        public ProjectDetails Add(ProjectDetails newObject)
        {
            throw new NotImplementedException();
        }

        public void Delete(ProjectDetails objectToDelete)
        {
            throw new NotImplementedException();
        }

        public ProjectDetails Get(object parameter)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<ProjectDetails> GetAll()
        {
            throw new NotImplementedException();
        }

        public ProjectDetails GetAllForProject(string projectId)
        {
            var result = projectDetails.Find(x => x.ProjectId == projectId).FirstOrDefault();

            return result;
        }

        public void Update(ProjectDetails objectToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
