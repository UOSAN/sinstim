using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SinStim.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Pictures",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Path = table.Column<string>(nullable: true),
                    FileName = table.Column<string>(nullable: true),
                    Category = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pictures", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    IsRejected = table.Column<bool>(nullable: false),
                    SurveyStartTime = table.Column<DateTimeOffset>(nullable: true),
                    SurveyEndTime = table.Column<DateTimeOffset>(nullable: true),
                    SurveyCompletionCode = table.Column<Guid>(nullable: true),
                    EligibilityStartTime = table.Column<DateTimeOffset>(nullable: true),
                    EligibilityEndTime = table.Column<DateTimeOffset>(nullable: true),
                    EligibilityCompletionCode = table.Column<Guid>(nullable: true),
                    AssignedCategory = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Eligibilities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    Alcohol = table.Column<bool>(nullable: true),
                    Tobacco = table.Column<bool>(nullable: true),
                    Cocaine = table.Column<bool>(nullable: true),
                    Heroin = table.Column<bool>(nullable: true),
                    Marijuana = table.Column<bool>(nullable: true),
                    Methamphetamine = table.Column<bool>(nullable: true),
                    Pills = table.Column<bool>(nullable: true),
                    Chocolate = table.Column<bool>(nullable: true),
                    Cookies = table.Column<bool>(nullable: true),
                    Donuts = table.Column<bool>(nullable: true),
                    Fries = table.Column<bool>(nullable: true),
                    IceCream = table.Column<bool>(nullable: true),
                    Pasta = table.Column<bool>(nullable: true),
                    Pizza = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Eligibilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Eligibilities_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Ratings",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    PictureId = table.Column<Guid>(nullable: false),
                    Recognizability = table.Column<int>(nullable: true),
                    Desirability = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ratings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Ratings_Pictures_PictureId",
                        column: x => x.PictureId,
                        principalTable: "Pictures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Ratings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Eligibilities_UserId",
                table: "Eligibilities",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_PictureId",
                table: "Ratings",
                column: "PictureId");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_UserId",
                table: "Ratings",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Eligibilities");

            migrationBuilder.DropTable(
                name: "Ratings");

            migrationBuilder.DropTable(
                name: "Pictures");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
