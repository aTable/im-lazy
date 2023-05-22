using System.Collections.Generic;
using Your.Namespace.Api.Common;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Speakers
{
    public class AddSpeakerPayload : SpeakerPayloadBase
    {
        public AddSpeakerPayload(Speaker speaker)
            : base(speaker)
        {
        }

        public AddSpeakerPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}
