using System;

namespace SinStim.Models {
    public class Demographics {
        public string Id { get; set; }
        public string UserId { get; set; }

        public int Age { get; set;}

        public string Gender { get; set; }

        public string Race_Arab { get; set; }
        public string Race_Asian_PacificIslander { get; set; }
        public string Race_Black_AfricanAmerican { get; set; }
        public string Race_Hispanic_Latino { get; set; }
        public string Race_Indigenous_Aboriginal { get; set; }
        public string Race_White_Caucasian { get; set; }
        public string Race_Other { get; set; }
        public string Race_NoReponse { get; set; }

        public string Education { get; set; }

        public string MartialStatus { get; set; }

        public DateTimeOffset? StartTime { get; set; }
        public DateTimeOffset? EndTime { get; set; }
        public User User { get; set; }
    }
}
