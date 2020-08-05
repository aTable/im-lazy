using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
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
            Field<HealthType>(
                name: "health",
                resolve: ctx => new HealthModel { ApiStatus = "we good" });

            Field<AlbumType>(
                name: "album",
                arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "id" }),
                resolve: ctx => context.Albums.FirstOrDefault(x => x.Id == ctx.GetArgument<int>("id", int.MinValue))
            );
            Field<ArtistType>(
                name: "artist",
                arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "id" }),
                resolve: ctx => context.Artists.Include(x => x.Albums).FirstOrDefault(x => x.Id == ctx.GetArgument<int>("id", int.MinValue))
            );
            Field<ListGraphType<ArtistType>>(name: "artists", resolve: ctx => context.Artists.Include(x => x.Albums).ToList());
            Field<ListGraphType<AlbumType>>(name: "albums", resolve: ctx => context.Albums.ToList());
        }
    }
}