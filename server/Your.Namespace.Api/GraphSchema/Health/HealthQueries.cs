using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Your.Namespace.Api.DataAccess;
using Your.Namespace.Api.GraphSchema.Artists;

namespace Your.Namespace.Api.GraphSchema.Health
{
    [ExtendObjectType(Name = "Query")]
    public class HealthQueries
    {
        public Health GetHealth([Service] Context context)
        {
            var random = new Random().Next(0, 2);
            return new Health
            {
                ApiStatus = random == 1 ? "we good" : "we not good",
                DatabaseStatus = "online"
            };
        }
    }
}