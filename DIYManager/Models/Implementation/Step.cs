using DIYManager.Models.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DIYManager.Models.Implementation
{
    public class Step //: IStep
    {
       // [BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        public int Id { get; set; }

       // [BsonRepresentation(BsonType.ObjectId)]
        public int ProjectId { get; set; }

        public string Name { get; set; }

        public bool IsReady { get; set; }

        public Step()
        {

        }
    }
}
