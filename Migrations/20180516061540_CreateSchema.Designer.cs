﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using SinStim.Models;
using System;

namespace SinStim.Migrations
{
    [DbContext(typeof(SinStimContext))]
    [Migration("20180516061540_CreateSchema")]
    partial class CreateSchema
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SinStim.Models.Eligibility", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnName("ID");

                    b.Property<bool?>("Alcohol")
                        .HasColumnName("ALCOHOL");

                    b.Property<bool?>("Chocolate")
                        .HasColumnName("CHOCOLATE");

                    b.Property<bool?>("Cocaine")
                        .HasColumnName("COCAINE");

                    b.Property<bool?>("Cookies")
                        .HasColumnName("COOKIES");

                    b.Property<bool?>("Donuts")
                        .HasColumnName("DONUTS");

                    b.Property<bool?>("Fries")
                        .HasColumnName("FRIES");

                    b.Property<bool?>("Heroin")
                        .HasColumnName("HEROIN");

                    b.Property<bool?>("IceCream")
                        .HasColumnName("ICE_CREAM");

                    b.Property<bool?>("Marijuana")
                        .HasColumnName("MARIJUANA");

                    b.Property<bool?>("Methamphetamine")
                        .HasColumnName("METHAMPHETAMINE");

                    b.Property<bool?>("Neutral")
                        .HasColumnName("NEUTRAL");

                    b.Property<bool?>("Pasta")
                        .HasColumnName("PASTA");

                    b.Property<bool?>("Pills")
                        .HasColumnName("PILLS");

                    b.Property<bool?>("Pizza")
                        .HasColumnName("PIZZA");

                    b.Property<bool?>("Tobacco")
                        .HasColumnName("TOBACCO");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnName("USER_ID")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("ELIGIBILITIES");
                });

            modelBuilder.Entity("SinStim.Models.Picture", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnName("ID");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnName("CATEGORY")
                        .HasMaxLength(50);

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnName("FILE_NAME")
                        .HasMaxLength(50);

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnName("PATH");

                    b.HasKey("Id");

                    b.ToTable("PICTURES");
                });

            modelBuilder.Entity("SinStim.Models.Rating", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnName("ID");

                    b.Property<int?>("Desirability")
                        .HasColumnName("DESIRABILITY");

                    b.Property<Guid>("PictureId")
                        .HasColumnName("PICTURE_ID");

                    b.Property<int?>("Recognizability")
                        .HasColumnName("RECOGNIZABILITY");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnName("USER_ID")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("PictureId");

                    b.HasIndex("UserId");

                    b.ToTable("RATINGS");
                });

            modelBuilder.Entity("SinStim.Models.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnName("ID")
                        .HasMaxLength(50);

                    b.Property<string>("AssignedCategory")
                        .HasColumnName("ASSIGNED_CATEGORY")
                        .HasMaxLength(50);

                    b.Property<bool>("IsRejected")
                        .HasColumnName("IS_REJECTED");

                    b.Property<DateTimeOffset?>("SurveyEndTime")
                        .HasColumnName("SURVEY_END_TIME");

                    b.Property<DateTimeOffset?>("SurveyStartTime")
                        .HasColumnName("SURVEY_START_TIME");

                    b.Property<DateTimeOffset?>("TaskEndTime")
                        .HasColumnName("TASK_END_TIME");

                    b.Property<DateTimeOffset?>("TaskStartTime")
                        .HasColumnName("TASK_START_TIME");

                    b.HasKey("Id");

                    b.ToTable("USERS");
                });

            modelBuilder.Entity("SinStim.Models.Eligibility", b =>
                {
                    b.HasOne("SinStim.Models.User", "User")
                        .WithMany("Eligibilities")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_ELIGIBILITY_USER");
                });

            modelBuilder.Entity("SinStim.Models.Rating", b =>
                {
                    b.HasOne("SinStim.Models.Picture", "Picture")
                        .WithMany("Ratings")
                        .HasForeignKey("PictureId")
                        .HasConstraintName("FK_RATINGS_PICTURES");

                    b.HasOne("SinStim.Models.User", "User")
                        .WithMany("Ratings")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK_RATINGS_USERS");
                });
#pragma warning restore 612, 618
        }
    }
}
