using DIYManager.Data;
using DIYManager.Models.Implementation;
using DIYManager.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DIYManager.Services.Implementation
{
    public class StepService : IStepService
    {
        private readonly DbSet<Step> steps;

        private readonly DbContext context;

        public StepService(DiyManagerContext context)
        {
            steps = context.Step;

            this.context = context;
        }

        public Step Add(Step newObject)
        {
            steps.Add(newObject);

            context.SaveChanges();

            return newObject;
        }

        public void Delete(Step objectToDelete)
        {
            throw new NotImplementedException();
        }

        public Step Get(object parameter)
        {
            var id = int.Parse(parameter.ToString());

            var result = steps.Where(x => x.Id == id).FirstOrDefault();

            return result;
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
            var id = int.Parse(parameter.ToString());

            var result = steps.Where(x => x.ProjectId == id).ToList();

            return result;
        }

        public void Update(Step objectToUpdate)
        {
            var existing = Get(objectToUpdate.Id);

            if (existing != null)
                context.Entry(existing).State = EntityState.Detached;

            steps.Update(objectToUpdate);

            context.SaveChanges();
        }
    }
}
