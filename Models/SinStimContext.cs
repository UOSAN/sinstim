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

        public DbSet<IncompleteCategory> IncompleteCategoryQuery { get; set;}
        public DbSet<PictureToRate> PictureToRateQuery { get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<IncompleteCategory>(ic => ic.HasNoKey());
            modelBuilder.Entity<PictureToRate>(ptr => ptr.HasNoKey());
        }
    }
}
