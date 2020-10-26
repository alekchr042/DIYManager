using DIYManager.Models.Implementation;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace DIYManager.Models.Interfaces
{
    public interface IProject
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        string Id { get; set; }

        /// <summary>
        /// Project name
        /// </summary>
        string Name { get; set; }

        /// <summary>
        /// Short description of project
        /// </summary>
        string Description { get; set; }

        /// <summary>
        /// User associated with project
        /// </summary>
        public User Owner { get; set; }

        /// <summary>
        /// Thumbnail of the project
        /// </summary>
        public string Thumbnail { get; set; }

        /// <summary>
        /// Date of the last time user modified the project in app
        /// </summary>
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        DateTime LastModified { get; set; }

        /// <summary>
        /// Start date of the project
        /// </summary>
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        DateTime? StartDate { get; set; }

        /// <summary>
        /// Finish date of the project
        /// </summary>
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        DateTime? FinishDate { get; set; }
    }
}
