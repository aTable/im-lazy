using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Your.Namespace.Api.GraphSchema.Albums;
using Your.Namespace.Api.GraphSchema.Artists;

namespace Your.Namespace.Api.DataAccess
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options)
            : base(options)
        {

        }

        public DbSet<Artist> Artists { get; set; }
        public DbSet<Album> Albums { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Artist>().HasMany(x => x.Albums).WithOne(x => x.Artist);
            builder.Entity<Artist>().HasKey(x => x.Id);
            builder.Entity<Artist>().Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Entity<Album>().HasKey(x => x.Id);
            builder.Entity<Album>().Property(x => x.Id).ValueGeneratedOnAdd();
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