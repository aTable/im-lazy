using System.Collections.Generic;
using Your.Namespace.Api.Common;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Speakers
{
    public class SpeakerPayloadBase : Payload
    {
        protected SpeakerPayloadBase(Speaker speaker)
        {
            Speaker = speaker;
        }

        protected SpeakerPayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public Speaker? Speaker { get; }
    }
}
