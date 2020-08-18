using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Your.Namespace.Api.DataAccess;

namespace Your.Namespace.Api.GraphSchema.Artists
{
    public class CreateArtistInput
    {
        public string Name { get; set; }
    }
}