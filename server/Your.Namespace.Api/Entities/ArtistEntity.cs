using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Your.Namespace.Api.Entities
{
    public class ArtistEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double TotalRevenue { get; set; }
        public ICollection<AlbumEntity> Albums { get; set; }
    }
}