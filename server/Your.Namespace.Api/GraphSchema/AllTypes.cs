using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Your.Namespace.Api.Entities;
using GraphQL.Authorization;

namespace Your.Namespace.Api.GraphSchema
{
    public class ArtistType : ObjectGraphType<ArtistEntity>
    {
        public ArtistType()
        {
            Field(x => x.Id).Description("id");
            Field(x => x.Name).Description("name");
            Field(x => x.TotalRevenue).AuthorizeWith(Policies.God);
            Field<ListGraphType<AlbumType>>(name: "albums", description: "albums");
        }
    }

    public class AlbumType : ObjectGraphType<AlbumEntity>
    {
        public AlbumType()
        {
            Field(x => x.Id).Description("id");
            Field(x => x.Name).Description("name");
            Field(x => x.Artist).Description("artist");
        }
    }
}