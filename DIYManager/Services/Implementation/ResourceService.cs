using DIYManager.Models.DTO;
using DIYManager.Models.Implementation;
using DIYManager.Models.Interfaces;
using DIYManager.Services.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DIYManager.Services.Implementation
{
    public class ResourceService : IResourceService
    {
        private readonly IMongoCollection<Resource> resources;

        public ResourceService(IDatabaseSettings databaseSettings)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);

            var database = client.GetDatabase(databaseSettings.DatabaseName);

            resources = database.GetCollection<Resource>("Resources");
        }

        public Resource Add(Resource newObject)
        {
            resources.InsertOne(newObject);

            return newObject;
        }

        public void Delete(Resource objectToDelete)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get resource specified by id
        /// </summary>
        /// <param name="parameter">Id of the resource</param>
        /// <returns>Resource specified by id</returns>
        public Resource Get(object parameter)
        {
            var result = resources.Find(x => x.Id == parameter.ToString()).FirstOrDefault();

            return result;
        }

        /// <summary>
        /// Get all resources asociated with project
        /// </summary>
        /// <param name="parameter">Project id</param>
        /// <returns>All resources associated with project</returns>
        public IEnumerable<Resource> GetAllForProject(object parameter)
        {
            var result = resources.Find(x => x.ProjectId == parameter.ToString()).ToList();

            return result;
        }

        /// <summary>
        /// Get all resources as dto asociated with project
        /// </summary>
        /// <param name="parameter">Project id</param>
        /// <returns>All resources associated with project</returns>
        public IEnumerable<ResourceDTO> GetAllDtosForProject(object parameter)
        {
            var resources = GetAllForProject(parameter);

            var result = resources.Select(x => new ResourceDTO(x));

            return result;
        }

        /// <summary>
        /// Get all resources.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Resource> GetAll()
        {
            var result = resources.Find(x => true).ToList();

            return result;
        }

        public void Update(Resource objectToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
