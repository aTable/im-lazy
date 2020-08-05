using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Your.Namespace.Api.Entities;
using GraphQL.Authorization;
using Your.Namespace.Api.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace Your.Namespace.Api.GraphSchema
{
    public class HealthModel
    {
        public string ApiStatus { get; set; }
    }

    public class HealthType : ObjectGraphType<HealthModel>
    {
        public HealthType()
        {
            Field(x => x.ApiStatus);
        }
    }
    public class ArtistType : ObjectGraphType<ArtistEntity>
    {
        public ArtistType()
        {
            Field(x => x.Id);
            Field(x => x.Name);
            Field(x => x.TotalRevenue).AuthorizeWith(Policies.God);
            Field<ListGraphType<AlbumType>>(name: "albums", description: "albums");
        }
    }

    public class AlbumType : ObjectGraphType<AlbumEntity>
    {
        public AlbumType(Context context)
        {
            Field(x => x.Id);
            Field(x => x.Name);
            Field(x => x.ReleaseDate);
            FieldAsync<ArtistType>(
                name: "artist",
                resolve: async ctx =>
                {
                    return await context.Artists.FirstOrDefaultAsync(x => x.Id == ctx.Source.ArtistId);
                });
        }
    }
}