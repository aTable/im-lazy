using Microsoft.EntityFrameworkCore;
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
}