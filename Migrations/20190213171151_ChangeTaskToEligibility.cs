using Microsoft.EntityFrameworkCore.Migrations;

namespace SinStim.Migrations
{
    public partial class ChangeTaskToEligibility : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TaskStartTime",
                table: "Users",
                newName: "EligibilityStartTime");

            migrationBuilder.RenameColumn(
                name: "TaskEndTime",
                table: "Users",
                newName: "EligibilityEndTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EligibilityStartTime",
                table: "Users",
                newName: "TaskStartTime");

            migrationBuilder.RenameColumn(
                name: "EligibilityEndTime",
                table: "Users",
                newName: "TaskEndTime");
        }
    }
}
