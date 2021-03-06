﻿using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DIYManager.Models.Interfaces
{
    public interface IUser
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        string Id { get; set; }

        /// <summary>
        /// Name to be displayed
        /// </summary>
        string Name { get; set; }

        string Username { get; set; }

        byte[] PasswordHash { get; set; }

        byte[] PasswordSalt { get; set; }

    }
}
