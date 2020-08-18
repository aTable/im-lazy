using IdentityModel;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Your.Namespace.Api.GraphSchema.Albums;
using Your.Namespace.Api.GraphSchema.Artists;

namespace Your.Namespace.Api.DataAccess
{
    public static class SeedData
    {
        public static void EnsureSeedData(Context context)
        {
            var jinjer = new Artist
            {
                Id = 1,
                Name = "Jinjer",
                TotalRevenue = 50.7d,
                Albums = new List<Album>
                {
                    new Album
                    {
                        Id = 1,
                        Name = "Inhale, Don't Breathe",
                        ReleaseDate = DateTime.Parse("2012-01-01"),
                    },
                    new Album
                    {
                        Id = 2,
                        Name = "Cloud Factory",
                        ReleaseDate = DateTime.Parse("2014-01-01"),
                    },
                    new Album
                    {
                        Id = 3,
                        Name = "King of Everything",
                        ReleaseDate = DateTime.Parse("2016-01-01"),
                    },
                    new Album
                    {
                        Id = 4,
                        Name = "Micro",
                        ReleaseDate = DateTime.Parse("2019-01-01"),
                    },
                    new Album
                    {
                        Id = 5,
                        Name = "Macro",
                        ReleaseDate = DateTime.Parse("2019-01-01"),
                    }
                }
            };

            var jinjerEntity = context.Set<Album>().FirstOrDefault(x => x.Name.Equals(jinjer.Name));
            if (jinjerEntity == null)
            {
                context.Add(jinjer);
            }

            var death = new Artist
            {
                Id = 2,
                Name = "Death",
                TotalRevenue = 100.7d,
                Albums = new List<Album>
                {
                    new Album
                    {
                        Id = 6,
                        Name = "Scream Bloody Gore",
                        ReleaseDate = DateTime.Parse("1987-01-01"),
                    },
                    new Album
                    {
                        Id = 7,
                        Name = "Leprosy",
                        ReleaseDate = DateTime.Parse("1988-01-01"),
                    },
                    new Album
                    {
                        Id = 8,
                        Name = "Spiritual Healing",
                        ReleaseDate = DateTime.Parse("1990-01-01"),
                    },
                    new Album
                    {
                        Id = 9,
                        Name = "Human",
                        ReleaseDate = DateTime.Parse("1991-01-01"),
                    },
                    new Album
                    {
                        Id = 10,
                        Name = "Individual Thought Patterns",
                        ReleaseDate = DateTime.Parse("1993-01-01"),
                    },
                    new Album
                    {
                        Id = 11,
                        Name = "Symbolic",
                        ReleaseDate = DateTime.Parse("1995-01-01"),
                    },
                    new Album
                    {
                        Id = 12,
                        Name = "The Sound of Perseverance",
                        ReleaseDate = DateTime.Parse("1998-01-01"),
                    }
                }
            };
            var deathEntity = context.Set<Album>().FirstOrDefault(x => x.Name.Equals(jinjer.Name));
            if (deathEntity == null)
            {
                context.Add(death);
            }


            if (context.ChangeTracker.HasChanges())
            {
                context.SaveChanges();
            }
        }
    }
}