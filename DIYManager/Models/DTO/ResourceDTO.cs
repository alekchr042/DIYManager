using DIYManager.Models.Enums;
using DIYManager.Models.Implementation;

namespace DIYManager.Models.DTO
{
    public class ResourceDTO
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public string Type { get; set; }

        public string Name { get; set; }

        public string Manufacturer { get; set; }

        public bool IsAvailable { get; set; }

        public bool IsSharedWithAnotherProject { get; set; }

        public ResourceDTO()
        {
        }

        /// <summary>
        /// Creates dto based on resource entity
        /// </summary>
        /// <param name="resource"></param>
        public ResourceDTO(Resource resource)
        {
            Id = resource.Id;

            ProjectId = ProjectId;

            Type = resource.Type.ToString();

            Name = resource.Name;

            Manufacturer = resource.Manufacturer;

            IsAvailable = resource.IsAvailable;

            IsSharedWithAnotherProject = resource.IsSharedWithAnotherProject;
        }
    }
}
