using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Your.Namespace.Api.DataAccess;
using Your.Namespace.Api.GraphSchema.Artists;

namespace Your.Namespace.Api.GraphSchema.Albums
{
    [ExtendObjectType(Name = "Query")]
    public class AlbumQueries
    {
        //[UsePaging]
        //[UseFiltering]
        //[UseSorting]
        public IEnumerable<Album> GetAlbums(
            [Service] Context context) =>
            context.Albums.ToList();


        public Album GetAlbum(
            int id,
            [Service] Context context) =>
            context.Albums.Single(x => x.Id == id);
    }
}