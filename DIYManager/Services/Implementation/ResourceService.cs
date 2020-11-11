using DIYManager.Data;
using DIYManager.Models.DTO;
using DIYManager.Models.Implementation;
using DIYManager.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DIYManager.Services.Implementation
{
    public class ResourceService : IResourceService
    {
        //private readonly IMongoCollection<Resource> resources;

        private readonly DbSet<Resource> resources;

        private readonly DbContext context;

        public ResourceService(DiyManagerContext context)
        {
            //var client = new MongoClient(databaseSettings.ConnectionString);

            //var database = client.GetDatabase(databaseSettings.DatabaseName);

            //resources = database.GetCollection<Resource>("Resources");

            resources = context.Resource;

            this.context = context;
        }

        public Resource Add(Resource newObject)
        {
            resources.Add(newObject);

            context.SaveChanges();

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
            var id = int.Parse(parameter.ToString());
            var result = resources.Where(x => x.Id == id).FirstOrDefault();

            return result;
        }

        /// <summary>
        /// Get all resources asociated with project
        /// </summary>
        /// <param name="parameter">Project id</param>
        /// <returns>All resources associated with project</returns>
        public IEnumerable<Resource> GetAllForProject(object parameter)
        {
            var id = int.Parse(parameter.ToString());

            var result = resources.Where(x => x.ProjectId == id).ToList();

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
            var result = resources.ToList();

            return result;
        }

        public void Update(Resource objectToUpdate)
        {
            var existing = Get(objectToUpdate.Id);

            if (existing != null)
                context.Entry(existing).State = EntityState.Detached;

            resources.Update(objectToUpdate);

            context.SaveChanges();
        }
    }
}
