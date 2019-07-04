using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SinStim.Migrations
{
    public partial class Demographics : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Demographics",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Age = table.Column<int>(nullable: false),
                    Gender = table.Column<string>(nullable: true),
                    Race_Arab = table.Column<string>(nullable: true),
                    Race_Asian_PacificIslander = table.Column<string>(nullable: true),
                    Race_Black_AfricanAmerican = table.Column<string>(nullable: true),
                    Race_Hispanic_Latino = table.Column<string>(nullable: true),
                    Race_Indigenous_Aboriginal = table.Column<string>(nullable: true),
                    Race_White_Caucasian = table.Column<string>(nullable: true),
                    Race_Other = table.Column<string>(nullable: true),
                    Race_NoReponse = table.Column<string>(nullable: true),
                    Education = table.Column<string>(nullable: true),
                    MartialStatus = table.Column<string>(nullable: true),
                    StartTime = table.Column<DateTimeOffset>(nullable: true),
                    EndTime = table.Column<DateTimeOffset>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Demographics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Demographics_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Demographics_UserId",
                table: "Demographics",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Demographics");
        }
    }
}
