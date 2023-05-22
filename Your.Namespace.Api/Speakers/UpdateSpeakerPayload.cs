using System.Collections.Generic;
using Your.Namespace.Api.Common;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Speakers
{
    public class UpdateSpeakerPayload : SpeakerPayloadBase
    {
        public UpdateSpeakerPayload(Speaker speaker)
            : base(speaker)
        {
        }

        public UpdateSpeakerPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}
