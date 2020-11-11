using DIYManager.Models.DTO;
using DIYManager.Models.Enums;
using DIYManager.Models.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace DIYManager.Models.Implementation
{
    public class Resource// : IResource
    {
        //[BsonId]
       // [BsonRepresentation(BsonType.ObjectId)]
        public int Id { get; set; }

        //[BsonRepresentation(BsonType.ObjectId)]
        public int ProjectId { get; set; }

        public ResourceType Type { get; set; }

        public string Name { get; set; }

        public string Manufacturer { get; set; }

        public bool IsAvailable { get; set; }

        public bool IsSharedWithAnotherProject { get; set; }

        public Resource()
        {
        }

        public Resource(ResourceDTO resourceDTO)
        {
            Id = resourceDTO.Id;

            ProjectId = resourceDTO.ProjectId;

            if (!string.IsNullOrEmpty(resourceDTO.Type))
                Type = Enum.Parse<ResourceType>(resourceDTO.Type);

            Name = resourceDTO.Name;

            Manufacturer = resourceDTO.Manufacturer;

            IsAvailable = resourceDTO.IsAvailable;

            IsSharedWithAnotherProject = resourceDTO.IsSharedWithAnotherProject;
        }
    }
}
