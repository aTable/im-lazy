using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Your.Namespace.Api.Data
{
    public class Track
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string? Name { get; set; }

        public ICollection<Session> Sessions { get; set; } =
            new List<Session>();
    }
}
