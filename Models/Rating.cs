using System;
using System.ComponentModel.DataAnnotations;

namespace SinStim.Models {
    public class Rating {
        [Required]
        public Guid Id { get; set; }

        public int Recognizability { get; set; }

        public int desirability { get; set; }

        public string UserId { get; set; }

        public Guid PictureId { get; set; }
    }
}