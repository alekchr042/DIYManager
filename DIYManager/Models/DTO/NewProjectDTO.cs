using DIYManager.Models.Implementation;

namespace DIYManager.Models.DTO
{
    public class NewProjectDTO
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public User Owner { get; set; }
    }
}
