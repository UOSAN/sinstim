using System;
using System.ComponentModel.DataAnnotations;

namespace SinStim.Models {
    public class Picture {
        [Required]
        public Guid Id { get; set; }

        public string Path { get; set; }

        public string FileName { get; set; }

        public string Category { get; set; }
    }
}