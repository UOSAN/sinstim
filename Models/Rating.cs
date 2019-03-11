using System;

namespace SinStim.Models {
    public class Rating {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string PictureId { get; set; }
        public int? Recognizability { get; set; }
        public int? Desirability { get; set; }

        public Picture Picture { get; set; }
        public User User { get; set; }
    }
}
