using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Your.Namespace.Api.Data;
using Your.Namespace.Api.GraphSchema.Albums;
using Your.Namespace.Api.GraphSchema.Artists;

namespace Your.Namespace.Api.DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<Session> Sessions { get; set; } = default!;

        public DbSet<Track> Tracks { get; set; } = default!;

        public DbSet<Speaker> Speakers { get; set; } = default!;

        public DbSet<Attendee> Attendees { get; set; } = default!;

        public DbSet<Artist> Artists { get; set; } = default!;
        public DbSet<Album> Albums { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Artist>().HasMany(x => x.Albums).WithOne(x => x.Artist);
            modelBuilder.Entity<Artist>().HasKey(x => x.Id);
            modelBuilder.Entity<Artist>().Property(x => x.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<Album>().HasKey(x => x.Id);
            modelBuilder.Entity<Album>().Property(x => x.Id).ValueGeneratedOnAdd();

            modelBuilder
               .Entity<Attendee>()
               .HasIndex(a => a.UserName)
               .IsUnique();

            // Many-to-many: Session <-> Attendee
            modelBuilder
                .Entity<SessionAttendee>()
                .HasKey(ca => new { ca.SessionId, ca.AttendeeId });

            // Many-to-many: Speaker <-> Session
            modelBuilder
                .Entity<SessionSpeaker>()
                .HasKey(ss => new { ss.SessionId, ss.SpeakerId });
        }
    }

    // public class ContextFactory : IDesignTimeDbContextFactory<Context>
    // {
    //     public Context CreateDbContext(string[] args)
    //     {
    //         var host = Program.CreateHostBuilder(args).Build();
    //         using var scope = host.Services.CreateScope();
    //         var configuration = host.Services.GetService<IConfiguration>();
    //         var connectionString = configuration.GetConnectionString("ConnectionString");
    //         var optionsBuilder = new DbContextOptionsBuilder<Context>();
    //         optionsBuilder.UseSqlite(connectionString);
    //         return new Context(optionsBuilder.Options);
    //     }
    // }

}