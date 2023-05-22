using System.Collections.Generic;
using Your.Namespace.Api.Common;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Speakers
{
    public class DeleteSpeakerPayload : SpeakerPayloadBase
    {
        public DeleteSpeakerPayload(Speaker speaker)
            : base(speaker)
        {
        }

        public DeleteSpeakerPayload(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }
    }
}
