using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using HotChocolate.Types.Descriptors;
using HotChocolate.Types.Filters;
using HotChocolate.Types.Introspection;
using HotChocolate.Types.Sorting;
using Your.Namespace.Api.DataAccess;
using Your.Namespace.Api.GraphSchema.Artists;

namespace Your.Namespace.Api.GraphSchema.Albums
{
    public class AlbumQueries
    {
        [UsePaging]
        [UseSelection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Album> GetAlbums(
            [Service] ApplicationDbContext context) =>
            context.Albums;

        [UseFirstOrDefault]
        [UseSelection]
        public IQueryable<Album> GetAlbum(
            int id,
            [Service] ApplicationDbContext context) =>
            context.Albums.Where(x => x.Id == id);
    }
}