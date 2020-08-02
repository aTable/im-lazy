using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using Your.Namespace.Api.DataAccess;

namespace Your.Namespace.Api.GraphSchema
{
    public class MyGraphQuery : ObjectGraphType
    {
        public MyGraphQuery(
            IServiceProvider provider,
            IDependencyResolver resolver,
            Context context
            )
        {
            Field<ListGraphType<ArtistType>>(name: "artists", resolve: ctx => context.Artists.ToList());
            Field<ListGraphType<AlbumType>>(name: "albums", resolve: ctx => context.Albums.ToList());
        }
    }
}