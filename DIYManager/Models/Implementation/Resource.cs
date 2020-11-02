﻿using DIYManager.Models.DTO;
using DIYManager.Models.Enums;
using DIYManager.Models.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

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

        public Resource(NewResourceDTO newResource)
        {
            ProjectId = newResource.ProjectId;

            if (!string.IsNullOrEmpty(newResource.Type))
                Type = Enum.Parse<ResourceType>(newResource.Type);

            Name = newResource.Name;

            Manufacturer = newResource.Manufacturer;

            IsAvailable = newResource.isAvailable;

            IsSharedWithAnotherProject = newResource.isShared;
        }
    }
}