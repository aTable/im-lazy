using HotChocolate.Types.Relay;
using HotChocolate;
using System.Threading.Tasks;
using System.Threading;
using Your.Namespace.Api.Data;
using Your.Namespace.Api.DataAccess;
using Your.Namespace.Api.DataLoader;
using Your.Namespace.Api.Extensions;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Your.Namespace.Api.Attendees
{
    public class SessionAttendeeCheckIn
    {
        public SessionAttendeeCheckIn(int attendeeId, int sessionId)
        {
            AttendeeId = attendeeId;
            SessionId = sessionId;
        }

        [ID(nameof(Attendee))]
        public int AttendeeId { get; }

        [ID(nameof(Session))]
        public int SessionId { get; }

        [UseApplicationDbContext]
        public async Task<int> CheckInCountAsync(
            [ScopedService] ApplicationDbContext context,
            CancellationToken cancellationToken) =>
            await context.Sessions
                .Where(session => session.Id == SessionId)
                .SelectMany(session => session.SessionAttendees)
                .CountAsync(cancellationToken);

        public Task<Attendee> GetAttendeeAsync(
            AttendeeByIdDataLoader attendeeById,
            CancellationToken cancellationToken) =>
            attendeeById.LoadAsync(AttendeeId, cancellationToken);

        public Task<Session> GetSessionAsync(
            SessionByIdDataLoader sessionById,
            CancellationToken cancellationToken) =>
            sessionById.LoadAsync(AttendeeId, cancellationToken);
    }
}
