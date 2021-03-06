﻿using DIYManager.Models.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace DIYManager.Models.Implementation
{
    public class ProjectDetails// : IProjectDetails
    {
       // [BsonId]
       // [BsonRepresentation(BsonType.ObjectId)]
        public int Id { get; set; }

      //  [BsonRepresentation(BsonType.ObjectId)]
        public int ProjectId { get; set; }

        public string DesignAuthor { get; set; }

        public string LinkToThePatternShop { get; set; }

        public List<Note> Notes { get; set; }

        public ProjectDetails()
        {

        }
    }
}
