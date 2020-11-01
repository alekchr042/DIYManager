using DIYManager.Models.Enums;
using DIYManager.Models.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DIYManager.Models.Implementation
{
    public class Resource : IResource
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string ProjectId { get; set; }

        public ResourceType Type { get; set; }

        public string Name { get; set; }

        public string Manufacturer { get; set; }

        public bool IsAvailable { get; set; }

        public bool IsSharedWithAnotherProject { get; set; }
    }
}
