using DIYManager.Models.Implementation;
using DIYManager.Models.Interfaces;
using DIYManager.Services.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DIYManager.Services.Implementation
{
    public class StepService : IStepService
    {
        private readonly IMongoCollection<Step> steps;

        public StepService(IDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);

            var database = client.GetDatabase(databaseSettings.DatabaseName);

            steps = database.GetCollection<Step>("Steps");
        }

        public Step Add(Step newObject)
        {
            steps.InsertOne(newObject);

            return newObject;
        }

        public void Delete(Step objectToDelete)
        {
            throw new NotImplementedException();
        }

        public Step Get(object parameter)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Step> GetAll()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get all steps asociated with project
        /// </summary>
        /// <param name="parameter">Project id</param>
        /// <returns>All steps associated with given project</returns>
        public IEnumerable<Step> GetAllForProject(object parameter)
        {
            var result = steps.Find(x => x.ProjectId == parameter.ToString()).ToList();

            return result;
        }

        public void Update(Step objectToUpdate)
        {
            steps.ReplaceOne(x => x.Id == objectToUpdate.Id, objectToUpdate);
        }
    }
}
