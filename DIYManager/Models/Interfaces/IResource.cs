using DIYManager.Models.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DIYManager.Models.Interfaces
{
    public interface IResource
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        string ProjectId { get; set; }

        ResourceType Type { get; set; }

        string Name { get; set; }

        string Manufacturer { get; set; }

        bool IsAvailable { get; set; }

        bool IsSharedWithAnotherProject { get; set; }
    }
}
