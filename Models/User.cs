using System;
using System.Collections.Generic;

namespace SinStim.Models {
    public class User {
        public User() {
            Eligibilities = new HashSet<Eligibility>();
            Ratings = new HashSet<Rating>();
        }

        public string Id { get; set; }
        public bool IsRejected { get; set; }
        public DateTimeOffset? SurveyStartTime { get; set; }
        public DateTimeOffset? SurveyEndTime { get; set; }
        public DateTimeOffset? TaskStartTime { get; set; }
        public DateTimeOffset? TaskEndTime { get; set; }
        public string AssignedCategory { get; set; }

        public ICollection<Eligibility> Eligibilities { get; set; }
        public ICollection<Rating> Ratings { get; set; }
    }
}
