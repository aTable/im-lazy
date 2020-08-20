using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.AspNetCore.Authorization;
using Your.Namespace.Api.GraphSchema.Artists;

namespace Your.Namespace.Api.GraphSchema.Albums
{
    public class Album
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }
        public MyRating MyRating { get; set; }

        public Artist Artist { get; set; }
        public int ArtistId { get; set; }
    }
}