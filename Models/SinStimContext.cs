using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace SinStim.Models {
    public partial class SinStimContext : DbContext {
        public SinStimContext(DbContextOptions options) : base(options) {
        }
        public virtual DbSet<Eligibility> Eligibilities { get; set; }
        public virtual DbSet<Picture> Pictures { get; set; }
        public virtual DbSet<Rating> Ratings { get; set; }
        public virtual DbSet<User> Users { get; set; }

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        //     if (!optionsBuilder.IsConfigured) {
        //         IConfigurationRoot configuration = new ConfigurationBuilder()
        //            .SetBasePath(Directory.GetCurrentDirectory())
        //            .AddJsonFile("appsettings.json")
        //            .Build();
        //         var connectionString = configuration.GetConnectionString("DefaultConnection");
        //         optionsBuilder.UseSqlServer(connectionString);
        //     }
        // }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Eligibility>(entity => {
                entity.ToTable("ELIGIBILITIES");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Alcohol).HasColumnName("ALCOHOL");

                entity.Property(e => e.Chocolate).HasColumnName("CHOCOLATE");

                entity.Property(e => e.Cocaine).HasColumnName("COCAINE");

                entity.Property(e => e.Cookies).HasColumnName("COOKIES");

                entity.Property(e => e.Donuts).HasColumnName("DONUTS");

                entity.Property(e => e.Fries).HasColumnName("FRIES");

                entity.Property(e => e.Heroin).HasColumnName("HEROIN");

                entity.Property(e => e.IceCream).HasColumnName("ICE_CREAM");

                entity.Property(e => e.Marijuana).HasColumnName("MARIJUANA");

                entity.Property(e => e.Methamphetamine).HasColumnName("METHAMPHETAMINE");

                entity.Property(e => e.Neutral).HasColumnName("NEUTRAL");

                entity.Property(e => e.Pasta).HasColumnName("PASTA");

                entity.Property(e => e.Pills).HasColumnName("PILLS");

                entity.Property(e => e.Pizza).HasColumnName("PIZZA");

                entity.Property(e => e.Tobacco).HasColumnName("TOBACCO");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("USER_ID")
                    .HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Eligibilities)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ELIGIBILITY_USER");
            });

            modelBuilder.Entity<Picture>(entity => {
                entity.ToTable("PICTURES");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Category)
                    .IsRequired()
                    .HasColumnName("CATEGORY")
                    .HasMaxLength(50);

                entity.Property(e => e.FileName)
                    .IsRequired()
                    .HasColumnName("FILE_NAME")
                    .HasMaxLength(50);

                entity.Property(e => e.Path)
                    .IsRequired()
                    .HasColumnName("PATH");
            });

            modelBuilder.Entity<Rating>(entity => {
                entity.ToTable("RATINGS");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Desirability).HasColumnName("DESIRABILITY");

                entity.Property(e => e.PictureId).HasColumnName("PICTURE_ID");

                entity.Property(e => e.Recognizability).HasColumnName("RECOGNIZABILITY");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("USER_ID")
                    .HasMaxLength(50);

                entity.HasOne(d => d.Picture)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.PictureId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RATINGS_PICTURES");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Ratings)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_RATINGS_USERS");
            });

            modelBuilder.Entity<User>(entity => {
                entity.ToTable("USERS");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasMaxLength(50)
                    .ValueGeneratedNever();

                entity.Property(e => e.AssignedCategory)
                    .HasColumnName("ASSIGNED_CATEGORY")
                    .HasMaxLength(50);

                entity.Property(e => e.IsRejected).HasColumnName("IS_REJECTED");

                entity.Property(e => e.SurveyEndTime).HasColumnName("SURVEY_END_TIME");

                entity.Property(e => e.SurveyStartTime).HasColumnName("SURVEY_START_TIME");

                entity.Property(e => e.TaskEndTime).HasColumnName("TASK_END_TIME");

                entity.Property(e => e.TaskStartTime).HasColumnName("TASK_START_TIME");
            });
        }
    }
}
