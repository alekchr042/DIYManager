using DIYManager.Models.Implementation;
using Microsoft.AspNetCore.Http;

namespace DIYManager.Models.DTO
{
    public class NewProjectDTO
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string OwnerId { get; set; }

        public IFormFile File { get; set; }
    }
}
