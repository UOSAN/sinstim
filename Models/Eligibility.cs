using System;

namespace SinStim.Models {
    public class Eligibility {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public bool? Alcohol { get; set; }
        public bool? Tobacco { get; set; }
        public bool? Cocaine { get; set; }
        public bool? Heroin { get; set; }
        public bool? Marijuana { get; set; }
        public bool? Methamphetamine { get; set; }
        public bool? Pills { get; set; }
        public bool? Chocolate { get; set; }
        public bool? Cookies { get; set; }
        public bool? Donuts { get; set; }
        public bool? Fries { get; set; }
        public bool? IceCream { get; set; }
        public bool? Pasta { get; set; }
        public bool? Pizza { get; set; }

        public User User { get; set; }
    }
}
