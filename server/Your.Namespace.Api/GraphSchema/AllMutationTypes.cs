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
    public class CreateAlbumInputType : InputObjectGraphType
    {
        public CreateAlbumInputType()
        {
            Name = "AlbumInput";
            Field<NonNullGraphType<StringGraphType>>("name");
            Field<NonNullGraphType<DateGraphType>>("releaseDate");
            Field<NonNullGraphType<IntGraphType>>("artistId");
        }
    }

    public class CreateArtistInputType : InputObjectGraphType
    {
        public CreateArtistInputType()
        {
            Name = "ArtistInput";
            Field<NonNullGraphType<StringGraphType>>("name");
        }
    }
}