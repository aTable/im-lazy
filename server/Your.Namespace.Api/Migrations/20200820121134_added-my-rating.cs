using Microsoft.EntityFrameworkCore.Migrations;

namespace Your.Namespace.Api.Migrations
{
    public partial class addedmyrating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MyRating",
                table: "Albums",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MyRating",
                table: "Albums");
        }
    }
}
