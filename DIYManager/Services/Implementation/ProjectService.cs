using DIYManager.Data;
using DIYManager.Models.Implementation;
using DIYManager.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DIYManager.Services.Implementation
{
    public class ProjectService : IProjectService
    {
        private readonly DbSet<Project> projects;

        private readonly DbContext context;

        public ProjectService(DiyManagerContext context)
        {
            projects = context.Project;

            this.context = context;
        }

        public Project Add(Project newObject)
        {
            projects.Add(newObject);

            context.SaveChanges();

            return newObject;
        }

        public void Delete(Project objectToDelete)
        {
            if (objectToDelete != null)
            {
                projects.Remove(objectToDelete);

                context.SaveChanges();
            }
        }

        /// <summary>
        /// Delete project by its ID
        /// </summary>
        /// <param name="parameter">ID of project to delete</param>
        public void Delete(object parameter)
        {
            if (parameter != null)
            {
                var project = Get(parameter);

                projects.Remove(project);

                context.SaveChanges();
            }
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
                var projectId = int.Parse(parameter.ToString());

                var result = projects.Where(x => x.Id == projectId).FirstOrDefault();

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
            var result = projects.Where(x => true).ToList();

            return result;
        }

        /// <summary>
        /// Gets all projects associated with given user ID
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>List of all projects associated with given user ID</returns>
        public IEnumerable<Project> GetAllByUser(string id)
        {
            var projectId = int.Parse(id);

            var result = projects.Where(x => x.Owner.Id == projectId).OrderByDescending(x => x.LastModified).ToList();


            return result;
        }

        public void Update(Project objectToUpdate)
        {
            var projectToUpdate = PrepareUpdatedProject(objectToUpdate); //fix for disapearing thumbnail

            var existing = Get(objectToUpdate.Id);

            if (existing != null)
                context.Entry(existing).State = EntityState.Detached;

            projects.Update(projectToUpdate);

            context.SaveChanges();
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
