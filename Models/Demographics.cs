using System;

namespace SinStim.Models {
    public class Demographics {
        public string Id { get; set; }
        public string UserId { get; set; }

        public int Age { get; set;}

        public string Gender { get; set; }

        public string Race { get; set; }

        public string Education { get; set; }

        public string MartialStatus { get; set; }
        public User User { get; set; }
    }
}
