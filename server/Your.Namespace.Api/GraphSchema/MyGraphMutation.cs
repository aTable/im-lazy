using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Your.Namespace.Api.DataAccess;
using Your.Namespace.Api.Entities;

namespace Your.Namespace.Api.GraphSchema
{
    public class MyGraphMutation : ObjectGraphType
    {
        public MyGraphMutation(Context context)
        {
            Field<AlbumType>(
                "createAlbum",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CreateAlbumInputType>> { Name = "album" }),
                resolve: ctx =>
                {
                    var albumInput = ctx.GetArgument<CreateAlbumInputType>("album");
                    var album = ctx.GetArgument<AlbumEntity>("album");

                    var newAlbum = new AlbumEntity
                    {
                        Id = context.Albums.Count() + 1,
                        Name = albumInput.Name,
                        ReleaseDate = album.ReleaseDate,
                        ArtistId = album.ArtistId,
                    };
                    context.Albums.Add(newAlbum);
                    context.SaveChanges();
                    return newAlbum;
                });

            Field<ArtistType>(
                "createArtist",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<CreateArtistInputType>> { Name = "artist" }),
                resolve: ctx =>
                {
                    var input = ctx.GetArgument<CreateArtistInputType>("artist");
                    var artist = ctx.GetArgument<ArtistEntity>("artist");

                    var newEntity = new ArtistEntity
                    {
                        Id = context.Artists.Count() + 1,
                        Name = input.Name,
                        TotalRevenue = new Random().NextDouble() * 100,
                    };
                    context.Artists.Add(newEntity);
                    context.SaveChanges();
                    return newEntity;
                });
        }
    }
}