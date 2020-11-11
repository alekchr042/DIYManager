using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DIYManager.Models.Interfaces
{
    public interface IStep
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        string ProjectId { get; set; }

        string Name { get; set; }

        bool IsReady { get; set; }
    }
}
