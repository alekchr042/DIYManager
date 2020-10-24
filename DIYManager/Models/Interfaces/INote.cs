using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace DIYManager.Models.Interfaces
{
    public interface INote
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        string Id { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        DateTime Date { get; set; }

        string Text { get; set; }
    }
}
