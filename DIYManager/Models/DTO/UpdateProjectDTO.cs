﻿using Microsoft.AspNetCore.Http;
using System;

namespace DIYManager.Models.DTO
{
    public class UpdateProjectDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int OwnerId { get; set; }

        public IFormFile File { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? FinishDate { get; set; }
    }
}
