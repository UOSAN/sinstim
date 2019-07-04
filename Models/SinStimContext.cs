using Microsoft.EntityFrameworkCore;

namespace SinStim.Models {
    public class SinStimContext : DbContext {
        public SinStimContext(DbContextOptions options) : base(options) {
        }
        public DbSet<Eligibility> Eligibilities { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Demographics> Demographics { get; set; }
    }
}
