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

        /// <summary>
        /// Gets project by its ID
        /// </summary>
        /// <param name="parameter">Project ID</param>
        /// <returns>Project or null if project ID is null</returns>
        public Project Get(object parameter)
        {
            if (parameter != null)
            {
                var projectId = parameter.ToString();

                var result = projects.Find(x => x.Id == projectId).FirstOrDefault();

                return result;
            }
            else return null;
        }

        /// <summary>
        /// Gets all projects
        /// </summary>
        /// <returns>List of all projects</returns>
        public IEnumerable<Project> GetAll()
        {
            var result = projects.Find(x => true).ToEnumerable();

            return result;
        }

        /// <summary>
        /// Gets all projects associated with given user ID
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>List of all projects associated with given user ID</returns>
        public IEnumerable<Project> GetAllByUser(string id)
        {
            var result = projects.Find(x => x.Owner.Id == id).ToEnumerable();

            return result;
        }

        public void Update(Project objectToUpdate)
        {
            var projectToUpdate = PrepareUpdatedProject(objectToUpdate); //fix for disapearing thumbnail
            var updatedProject = projects.ReplaceOne(x => x.Id == objectToUpdate.Id, projectToUpdate);
        }

        private Project PrepareUpdatedProject(Project updatedProject)
        {
            var oldVersion = Get(updatedProject.Id);

            if (updatedProject.Thumbnail == null)
                updatedProject.Thumbnail = oldVersion.Thumbnail;

            return updatedProject;
        }
    }
}
