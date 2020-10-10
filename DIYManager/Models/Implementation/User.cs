using DIYManager.Models.DTO;
using DIYManager.Models.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DIYManager.Models.Implementation
{
    public class User : IUser
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Username { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public User(RegisterUserDTO registerUserDTO)
        {
            Name = registerUserDTO.Name;

            Username = registerUserDTO.Username;
        }
    }
}
