using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Your.Namespace.Api.DataAccess;

namespace Your.Namespace.Api.GraphSchema.Artists
{
    [ExtendObjectType(Name = "Mutation")]
    public class ArtistMutations
    {
        public async Task<Artist> CreateArtist(
            CreateArtistInput input,
            [Service] Context context
            //[Service] IEventSender eventSender
            )
        {
            await Task.FromResult(true);
            var artistCount = context.Artists.Count();
            var artist = new Artist
            {
                Id = artistCount + 1,
                Name = input.Name,
                TotalRevenue = new Random().NextDouble() * 100000,
                Albums = null,
            };
            context.Artists.Add(artist);
            context.SaveChanges();
            //await eventSender.SendAsync(new OnArtistMessage(artist));
            return artist;
        }

        public async Task<Artist> UpdateArtist(
            UpdateArtistInput input,
            [Service] Context context
            //[Service] IEventSender eventSender
            )
        {
            await Task.FromResult(true);
            var artist = context.Artists.First(x => x.Id == input.Id);
            artist.Name = input.Name;
            context.SaveChanges();
            //await eventSender.SendAsync(new OnArtistMessage(artist));
            return artist;
        }
    }
}