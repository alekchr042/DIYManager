using DIYManager.Models.Implementation;
using DIYManager.Models.Interfaces;
using DIYManager.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace DIYManager.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> users;

        public UserService(IDatabaseSettings databaseSettings,
            IMemoryCache cache)
        {
            var client = new MongoClient(databaseSettings.ConnectionString);

            var database = client.GetDatabase(databaseSettings.DatabaseName);

            users = database.GetCollection<User>("User");
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                throw new ArgumentException("Username or password is null or empty");

            var user = GetByUsername(username);

            if (user != null &&
                PasswordHelper.VerifyPassword(password,
                new HashedPassword
                {
                    PasswordHash = user.PasswordHash,
                    PasswordSalt = user.PasswordSalt,
                }))
            {
                return user;
            }

            return null;
        }

        public User Create(User newUser, string password)
        {
            if (string.IsNullOrEmpty(password))
                throw new ArgumentException("Password is null or empty");

            var existingUserWithTheSameUsername = GetByUsername(newUser.Username);

            if (existingUserWithTheSameUsername != null)
                throw new ArgumentException("Username already taken - " + newUser.Username);

            var hashedPassword = PasswordHelper.CreatePasswordHash(password);

            newUser.PasswordHash = hashedPassword.PasswordHash;

            newUser.PasswordSalt = hashedPassword.PasswordSalt;

            return Add(newUser);
        }

        public User Add(User newObject)
        {
            users.InsertOne(newObject);

            return newObject;
        }

        public void Delete(User objectToDelete)
        {
            throw new System.NotImplementedException();
        }

        public User Get(object parameter)
        {
            var id = parameter.ToString();

            var result = users.Find(x => x.Id == id).FirstOrDefault();

            return result;
        }

        public IEnumerable<User> GetAll()
        {
            var result = users.Find(x => true).ToEnumerable();

            return result;
        }

        public User GetByUsername(string username)
        {
            var result = users.Find(x => x.Username == username).FirstOrDefault();

            return result;
        }

        public void Update(User objectToUpdate)
        {
            throw new System.NotImplementedException();
        }

        private class PasswordHelper
        {
            public static HashedPassword CreatePasswordHash(string password)
            {
                if (string.IsNullOrEmpty(password))
                    throw new ArgumentException("Password null or empty");

                var hashedPassword = new HashedPassword();

                using (var hmac = new HMACSHA512())
                {
                    hashedPassword.PasswordSalt = hmac.Key;

                    hashedPassword.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                }
                return hashedPassword;
            }

            public static bool VerifyPassword(string password, HashedPassword hashedPassword)
            {
                if (string.IsNullOrEmpty(password))
                    throw new ArgumentException("Password null or empty");

                if (hashedPassword.PasswordHash.Length != 64 ||
                    hashedPassword.PasswordSalt.Length != 128)
                    throw new ArgumentException("Invalid password hash");

                using (var hmac = new HMACSHA512(hashedPassword.PasswordSalt))
                {
                    var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

                    for (int i = 0; i < passwordHash.Length; i++)
                    {
                        if (passwordHash[i] != hashedPassword.PasswordHash[i])
                            return false;
                    }
                }
                return true;
            }
        }

        private class HashedPassword
        {
            public byte[] PasswordHash { get; set; }

            public byte[] PasswordSalt { get; set; }
        }
    }
}
