using DIYManager.Data;
using DIYManager.Models.Implementation;
using DIYManager.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DIYManager.Services.Implementation
{
    public class ProjectDetailsService : IProjectDetailsService
    {
        private readonly DbSet<ProjectDetails> projectDetails;

        private readonly DbContext context;

        public ProjectDetailsService(DiyManagerContext context)
        {
            projectDetails = context.ProjectDetails;

            this.context = context;
        }
        public ProjectDetails Add(ProjectDetails newObject)
        {
            projectDetails.Add(newObject);

            context.SaveChanges();

            return newObject;
        }

        public void Delete(ProjectDetails objectToDelete)
        {
            throw new NotImplementedException();
        }

        public ProjectDetails Get(object parameter)
        {
            var id = int.Parse(parameter.ToString());

            var result = projectDetails.Where(x => x.Id == id).FirstOrDefault();

            return result;
        }

        public IEnumerable<ProjectDetails> GetAll()
        {
            throw new NotImplementedException();
        }

        public ProjectDetails GetAllForProject(string projectId)
        {
            var id = int.Parse(projectId);

            var result = projectDetails.Where(x => x.ProjectId == id).FirstOrDefault();

            return result;
        }

        public void Update(ProjectDetails objectToUpdate)
        {
            var existing = Get(objectToUpdate.Id);

            if (existing != null)
                context.Entry(existing).State = EntityState.Detached;

            projectDetails.Update(objectToUpdate);
        }
    }
}
