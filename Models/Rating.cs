﻿using System;
using System.Collections.Generic;

namespace SinStim.Models {
    public partial class Rating {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public Guid PictureId { get; set; }
        public int? Recognizability { get; set; }
        public int? Desirability { get; set; }

        public Picture Picture { get; set; }
        public User User { get; set; }
    }
}
