using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Your.Namespace.Api.DataAccess;
using Your.Namespace.Api.GraphSchema.Artists;

namespace Your.Namespace.Api.GraphSchema.Albums
{
    [ExtendObjectType(Name = "Mutation")]
    public class AlbumMutations
    {
        public async Task<Album> DeleteAlbum(
            DeleteAlbumInput input,
            [Service] ApplicationDbContext context
            //[Service] IEventSender eventSender
            )
        {
            await Task.FromResult(true);
            var album = context.Albums.Single(x => x.Id == input.AlbumId);
            context.Albums.Remove(album);
            context.SaveChanges();
            return album;
        }
    }
}