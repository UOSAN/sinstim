using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SinStim.Migrations
{
    public partial class AddCompletionCodeColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "EligibilityCompletionCode",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SurveyCompletionCode",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EligibilityCompletionCode",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SurveyCompletionCode",
                table: "Users");
        }
    }
}
