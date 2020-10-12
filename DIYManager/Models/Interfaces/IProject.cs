using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DIYManager.Models.Interfaces
{
    public interface IProject
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        string Id { get; set; }

        string Name { get; set; }

        string Description { get; set; }
    }
}
