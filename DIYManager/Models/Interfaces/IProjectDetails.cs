using DIYManager.Models.Implementation;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace DIYManager.Models.Interfaces
{
    public interface IProjectDetails
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        string Id { get; set; }

        /// <summary>
        /// Project associated with details
        /// </summary>
        [BsonRepresentation(BsonType.ObjectId)]
        string ProjectId { get; set; }

        /// <summary>
        /// Author of the design or pattern
        /// </summary>
        string DesignAuthor { get; set; }

        /// <summary>
        /// Link to the shop where the pattern was purchased
        /// </summary>
        string LinkToThePatternShop { get; set; }

        /// <summary>
        /// Notes added to the project
        /// </summary>
        List<Note> Notes { get; set; }
    }
}
