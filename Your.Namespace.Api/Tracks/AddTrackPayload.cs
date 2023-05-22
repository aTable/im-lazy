using System.Collections.Generic;
using Your.Namespace.Api.Common;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Tracks
{
    public class AddTrackPayload : TrackPayloadBase
    {
        public AddTrackPayload(Track track)
            : base(track)
        {
        }

        public AddTrackPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}
