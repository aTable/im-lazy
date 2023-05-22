using System.Collections.Generic;
using Your.Namespace.Api.Common;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Attendees
{
    public class AttendeePayloadBase : Payload
    {
        protected AttendeePayloadBase(Attendee attendee)
        {
            Attendee = attendee;
        }

        protected AttendeePayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public Attendee? Attendee { get; }
    }
}
