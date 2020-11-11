using DIYManager.Models.Implementation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace DIYManager.Data
{
    public class DiyManagerContext : DbContext
    {
        public DiyManagerContext(DbContextOptions<DiyManagerContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Project { get; set; }
        public DbSet<Step> Step { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<ProjectDetails> ProjectDetails { get; set; }
        public DbSet<Resource> Resource { get; set; }

    }

    public class DiyManagerFactory : IDesignTimeDbContextFactory<DiyManagerContext>
    {

        public DiyManagerFactory()
        {
        }

        public DiyManagerContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DiyManagerContext>();
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=DiyManager-2;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new DiyManagerContext(optionsBuilder.Options);
        }
    }
}
