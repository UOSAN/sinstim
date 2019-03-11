using System;
using System.Collections.Generic;

namespace SinStim.Models {
    public class User {
        public User() {
            Ratings = new HashSet<Rating>();
        }

        public string Id { get; set; }
        public bool IsRejected { get; set; }
        public DateTimeOffset? SurveyStartTime { get; set; }
        public DateTimeOffset? SurveyEndTime { get; set; }
        public string SurveyCompletionCode { get; set; }
        public DateTimeOffset? EligibilityStartTime { get; set; }
        public DateTimeOffset? EligibilityEndTime { get; set; }
        public string EligibilityCompletionCode { get; set; }
        public string AssignedCategory { get; set; }
        public Eligibility Eligibility { get; set; }
        public ICollection<Rating> Ratings { get; set; }
    }
}
