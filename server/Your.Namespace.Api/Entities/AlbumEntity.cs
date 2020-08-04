using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Your.Namespace.Api.Entities
{
    public class AlbumEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }

        public ArtistEntity Artist { get; set; }
        public int ArtistId { get; set; }
    }
}