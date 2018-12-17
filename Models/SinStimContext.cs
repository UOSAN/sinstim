using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace SinStim.Models {
    public class SinStimContext : DbContext {
        public SinStimContext(DbContextOptions options) : base(options) {
        }
        public DbSet<Eligibility> Eligibilities { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
