using System;
using System.Collections.Generic;

namespace SinStim.Models {
    public class Picture {
        public Picture() {
            Ratings = new HashSet<Rating>();
        }

        public string Id { get; set; }
        public string Path { get; set; }
        public string FileName { get; set; }
        public string Category { get; set; }

        public ICollection<Rating> Ratings { get; set; }
    }
}
