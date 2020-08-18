using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;
using Your.Namespace.Api.DataAccess;

namespace Your.Namespace.Api.GraphSchema.Artists
{
    [ExtendObjectType(Name = "Query")]
    public class ArtistQueries
    {
        //[UsePaging]
        //[UseFiltering]
        //[UseSorting]
        public IEnumerable<Artist> GetArtists(
            [Service] Context context) =>
            context.Artists.ToList();

        public Artist GetArtist(
            int id,
            [Service] Context context) =>
            context.Artists.Single(x => x.Id == id);
    }
}