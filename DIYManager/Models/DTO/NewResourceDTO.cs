using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIYManager.Models.DTO
{
    public class NewResourceDTO
    {
        public string ProjectId { get; set; }

        public string Name { get; set; }

        public string Manufacturer { get; set; }

        public string Type { get; set; }

        public bool isAvailable { get; set; }

        public bool isShared { get; set; }
    }
}
