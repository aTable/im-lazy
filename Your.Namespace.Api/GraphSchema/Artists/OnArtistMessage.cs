using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.Language;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Your.Namespace.Api.DataAccess;

namespace Your.Namespace.Api.GraphSchema.Artists
{
    // public class OnArtistMessage
    //     : EventMessage
    // {
    //     public OnArtistMessage(Artist artist)
    //         : base(CreateEventDescription(artist), artist)
    //     {
    //     }

    //     private static EventDescription CreateEventDescription(Artist artist)
    //     {
    //         return new EventDescription("onArtist",
    //             new ArgumentNode("artistname", artist.Name)
    //         );
    //     }
    // }
}
