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
                Name = "Jinjer",
                TotalRevenue = 50.7d,
                Albums = new List<Album>
                {
                    new Album
                    {
                        Name = "Inhale, Don't Breathe",
                        ReleaseDate = DateTime.Parse("2012-01-01"),
                        MyRating = MyRating.None,
                    },
                    new Album
                    {
                        Name = "Cloud Factory",
                        ReleaseDate = DateTime.Parse("2014-01-01"),
                        MyRating = MyRating.Okayish,
                    },
                    new Album
                    {
                        Name = "King of Everything",
                        ReleaseDate = DateTime.Parse("2016-01-01"),
                        MyRating = MyRating.Legendary,
                    },
                    new Album
                    {
                        Name = "Micro",
                        ReleaseDate = DateTime.Parse("2019-01-01"),
                        MyRating = MyRating.Okayish,
                    },
                    new Album
                    {
                        Name = "Macro",
                        ReleaseDate = DateTime.Parse("2019-01-01"),
                        MyRating = MyRating.Okayish,
                    }
                }
            };

            var jinjerEntity = context.Set<Artist>().FirstOrDefault(x => x.Name.Equals(jinjer.Name));
            if (jinjerEntity == null)
                context.Add(jinjer);

            var death = new Artist
            {
                Name = "Death",
                TotalRevenue = 100.7d,
                Albums = new List<Album>
                {
                    new Album
                    {
                        Name = "Scream Bloody Gore",
                        ReleaseDate = DateTime.Parse("1987-01-01"),
                        MyRating = MyRating.None,
                    },
                    new Album
                    {
                        Name = "Leprosy",
                        ReleaseDate = DateTime.Parse("1988-01-01"),
                        MyRating = MyRating.None,
                    },
                    new Album
                    {
                        Name = "Spiritual Healing",
                        ReleaseDate = DateTime.Parse("1990-01-01"),
                        MyRating = MyRating.None,
                    },
                    new Album
                    {
                        Name = "Human",
                        ReleaseDate = DateTime.Parse("1991-01-01"),
                        MyRating = MyRating.None,
                    },
                    new Album
                    {
                        Name = "Individual Thought Patterns",
                        ReleaseDate = DateTime.Parse("1993-01-01"),
                        MyRating = MyRating.None,
                    },
                    new Album
                    {
                        Name = "Symbolic",
                        ReleaseDate = DateTime.Parse("1995-01-01"),
                        MyRating = MyRating.None,
                    },
                    new Album
                    {
                        Name = "The Sound of Perseverance",
                        ReleaseDate = DateTime.Parse("1998-01-01"),
                        MyRating = MyRating.Legendary,
                    }
                }
            };
            var deathEntity = context.Set<Artist>().FirstOrDefault(x => x.Name.Equals(jinjer.Name));
            if (deathEntity == null)
                context.Add(death);

            var metallica = new Artist
            {
                Name = "Metallica",
                TotalRevenue = 123d,
                Albums = new List<Album>{
                    new Album { Name = "Kill 'Em All", ReleaseDate = DateTime.Parse("1983-07-25")},
                    new Album { Name = "Ride the Lightning", ReleaseDate = DateTime.Parse("1984-07-27")},
                    new Album { Name = "Master of Puppets", ReleaseDate = DateTime.Parse("1986-03-03")},
                    new Album { Name = "...And Justice for All", ReleaseDate = DateTime.Parse("1988-08-25")},
                    new Album { Name = "Black", ReleaseDate = DateTime.Parse("1991-08-12")},
                    new Album { Name = "Load", ReleaseDate = DateTime.Parse("1996-06-04")},
                    new Album { Name = "Reload", ReleaseDate = DateTime.Parse("1997-11-18")},
                    new Album { Name = "St. Anger", ReleaseDate = DateTime.Parse("2003-06-05")},
                    new Album { Name = "Death Magnetic", ReleaseDate = DateTime.Parse("2008-09-12")},
                    new Album { Name = "Hardwired...to Self-Destruct", ReleaseDate = DateTime.Parse("2016-11-18")},
                },
            };
            var metallicaEntity = context.Set<Artist>().FirstOrDefault(x => x.Name.Equals(metallica.Name));
            if (metallicaEntity == null)
                context.Add(metallica);

            var slayer = new Artist
            {
                Name = "Slayer",
                TotalRevenue = 1234d,
                Albums = new List<Album> {
                    new Album { Name = "Show No Mercy", ReleaseDate = DateTime.Parse("1983-12-03"), },
                    new Album { Name = "Hell Awaits", ReleaseDate = DateTime.Parse("1985-04-19"), },
                    new Album { Name = "Reign in Blood", ReleaseDate = DateTime.Parse("1986-10-07"), },
                    new Album { Name = "South of Heaven", ReleaseDate = DateTime.Parse("1988-07-05"), },
                    new Album { Name = "Seasons in the Abyss", ReleaseDate = DateTime.Parse("1990-10-09"), },
                    new Album { Name = "Divine Intervention", ReleaseDate = DateTime.Parse("1994-09-27"), },
                    new Album { Name = "Undisputed Attitude", ReleaseDate = DateTime.Parse("1996-05-28"), },
                    new Album { Name = "Diabolus in Musica", ReleaseDate = DateTime.Parse("1998-06-09"), },
                    new Album { Name = "God Hates Us All", ReleaseDate = DateTime.Parse("2001-09-11"), },
                    new Album { Name = "Christ Illusion", ReleaseDate = DateTime.Parse("2006-08-08"), },
                    new Album { Name = "World Painted Blood", ReleaseDate = DateTime.Parse("2009-11-03"), },
                    new Album { Name = "Repentless", ReleaseDate = DateTime.Parse("2015-09-11"), },
                },
            };
            var slayerEntity = context.Set<Artist>().FirstOrDefault(x => x.Name.Equals(slayer.Name));
            if (slayerEntity == null)
                context.Add(slayer);

            var megadeth = new Artist
            {
                Name = "Megadeth",
                TotalRevenue = 12345d,
                Albums = new List<Album> {
                    new Album { Name = "Killing Is My Business... and Business Is Good!", ReleaseDate = DateTime.Parse("1985-06-12"), },
                    new Album { Name = "Peace Sells... but Who's Buying?", ReleaseDate = DateTime.Parse("1986-09-19"), },
                    new Album { Name = "So Far, So Good... So What!", ReleaseDate = DateTime.Parse("1988-01-19"), },
                    new Album { Name = "Rust in Peace", ReleaseDate = DateTime.Parse("1990-09-24"), },
                    new Album { Name = "Countdown to Extinction", ReleaseDate = DateTime.Parse("1992-07-14"), },
                    new Album { Name = "Youthanasia", ReleaseDate = DateTime.Parse("1994-10-31"), },
                    new Album { Name = "Cryptic Writings", ReleaseDate = DateTime.Parse("1997-06-17"), },
                    new Album { Name = "Risk", ReleaseDate = DateTime.Parse("1999-08-31"), },
                    new Album { Name = "The World Needs a Hero", ReleaseDate = DateTime.Parse("2001-08-31"), },
                    new Album { Name = "The System Has Failed", ReleaseDate = DateTime.Parse("2004-09-14"), },
                    new Album { Name = "United Abominations", ReleaseDate = DateTime.Parse("2007-04-15"), },
                    new Album { Name = "Endgame", ReleaseDate = DateTime.Parse("2009-09-09"), },
                    new Album { Name = "Thirteen", ReleaseDate = DateTime.Parse("2011-11-01"), },
                    new Album { Name = "Super Collider", ReleaseDate = DateTime.Parse("2013-06-04"), },
                    new Album { Name = "Dystopia", ReleaseDate = DateTime.Parse("2016-01-22"), },
                },
            };
            var megadethEntity = context.Set<Artist>().FirstOrDefault(x => x.Name.Equals(megadeth.Name));
            if (megadethEntity == null)
                context.Add(megadeth);

            if (context.ChangeTracker.HasChanges())
            {
                context.SaveChanges();
            }
        }
    }
}