using HotChocolate.Types.Relay;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Attendees
{
    public record CheckInAttendeeInput(
        [ID(nameof(Session))]
        int SessionId,
        [ID(nameof(Attendee))]
        int AttendeeId);
}
