using System;
using System.ComponentModel.DataAnnotations;

namespace SinStim.Models {
    public class User {
        [Required]
        public string Id { get; set; }

        public DateTimeOffset SurveyStartTime { get; set; }

        public DateTimeOffset SurveyEndTime { get; set; }

        public DateTimeOffset TaskStartTime { get; set; }

        public DateTimeOffset TaskEndTime { get; set; }

        public string AssignedCategory { get; set; }

        public bool IsRejected { get; set; }
    }
}