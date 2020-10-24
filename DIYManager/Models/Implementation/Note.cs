using DIYManager.Models.Interfaces;
using System;

namespace DIYManager.Models.Implementation
{
    public class Note : INote
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }
    }
}
