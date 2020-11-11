using DIYManager.Helpers;
using DIYManager.Models.DTO;
using DIYManager.Models.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace DIYManager.Models.Implementation
{
    public class Project //: IProject
    {
        //[BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public User Owner { get; set; }

        public string Thumbnail { get; set; }

       // [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime LastModified { get; set; }

        //[BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime? StartDate { get; set; }

        //[BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime? FinishDate { get; set; }

        public Project()
        {

        }

        public Project(NewProjectDTO newProjectDTO)
        {
            Name = newProjectDTO.Name;

            Description = newProjectDTO.Description;

            LastModified = DateTime.Now;
        }

        public Project(UpdateProjectDTO updateProjectDTO, User owner)
        {
            Id = updateProjectDTO.Id;

            Name = updateProjectDTO.Name;

            Description = updateProjectDTO.Description;

            Owner = owner;

            if(updateProjectDTO.File != null)
                Thumbnail = FileReaderHelper.ReadImageFileContent(updateProjectDTO.File);

            LastModified = DateTime.Now;

            StartDate = updateProjectDTO.StartDate;

            FinishDate = updateProjectDTO.FinishDate;
        }
    }
}
