using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace SinStim.Migrations
{
    public partial class CreateSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PICTURES",
                columns: table => new
                {
                    ID = table.Column<Guid>(nullable: false),
                    CATEGORY = table.Column<string>(maxLength: 50, nullable: false),
                    FILE_NAME = table.Column<string>(maxLength: 50, nullable: false),
                    PATH = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PICTURES", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "USERS",
                columns: table => new
                {
                    ID = table.Column<string>(maxLength: 50, nullable: false),
                    ASSIGNED_CATEGORY = table.Column<string>(maxLength: 50, nullable: true),
                    IS_REJECTED = table.Column<bool>(nullable: false),
                    SURVEY_END_TIME = table.Column<DateTimeOffset>(nullable: true),
                    SURVEY_START_TIME = table.Column<DateTimeOffset>(nullable: true),
                    TASK_END_TIME = table.Column<DateTimeOffset>(nullable: true),
                    TASK_START_TIME = table.Column<DateTimeOffset>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_USERS", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ELIGIBILITIES",
                columns: table => new
                {
                    ID = table.Column<Guid>(nullable: false),
                    ALCOHOL = table.Column<bool>(nullable: true),
                    CHOCOLATE = table.Column<bool>(nullable: true),
                    COCAINE = table.Column<bool>(nullable: true),
                    COOKIES = table.Column<bool>(nullable: true),
                    DONUTS = table.Column<bool>(nullable: true),
                    FRIES = table.Column<bool>(nullable: true),
                    HEROIN = table.Column<bool>(nullable: true),
                    ICE_CREAM = table.Column<bool>(nullable: true),
                    MARIJUANA = table.Column<bool>(nullable: true),
                    METHAMPHETAMINE = table.Column<bool>(nullable: true),
                    NEUTRAL = table.Column<bool>(nullable: true),
                    PASTA = table.Column<bool>(nullable: true),
                    PILLS = table.Column<bool>(nullable: true),
                    PIZZA = table.Column<bool>(nullable: true),
                    TOBACCO = table.Column<bool>(nullable: true),
                    USER_ID = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ELIGIBILITIES", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ELIGIBILITY_USER",
                        column: x => x.USER_ID,
                        principalTable: "USERS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RATINGS",
                columns: table => new
                {
                    ID = table.Column<Guid>(nullable: false),
                    DESIRABILITY = table.Column<int>(nullable: true),
                    PICTURE_ID = table.Column<Guid>(nullable: false),
                    RECOGNIZABILITY = table.Column<int>(nullable: true),
                    USER_ID = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RATINGS", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RATINGS_PICTURES",
                        column: x => x.PICTURE_ID,
                        principalTable: "PICTURES",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RATINGS_USERS",
                        column: x => x.USER_ID,
                        principalTable: "USERS",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ELIGIBILITIES_USER_ID",
                table: "ELIGIBILITIES",
                column: "USER_ID");

            migrationBuilder.CreateIndex(
                name: "IX_RATINGS_PICTURE_ID",
                table: "RATINGS",
                column: "PICTURE_ID");

            migrationBuilder.CreateIndex(
                name: "IX_RATINGS_USER_ID",
                table: "RATINGS",
                column: "USER_ID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ELIGIBILITIES");

            migrationBuilder.DropTable(
                name: "RATINGS");

            migrationBuilder.DropTable(
                name: "PICTURES");

            migrationBuilder.DropTable(
                name: "USERS");
        }
    }
}
