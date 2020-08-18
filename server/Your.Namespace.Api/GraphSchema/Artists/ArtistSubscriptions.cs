using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using HotChocolate.Types.Relay;
using Microsoft.EntityFrameworkCore;
using Your.Namespace.Api.DataAccess;

namespace Your.Namespace.Api.GraphSchema.Artists
{
    [ExtendObjectType(Name = "Subscription")]
    public class ArtistSubscriptions
    {
        public Artist OnArtist(
            IEventMessage message,
            [Service] Context context)
        {
            return (Artist)message.Payload;
        }
    }
}
