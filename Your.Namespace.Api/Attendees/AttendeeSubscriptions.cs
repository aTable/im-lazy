using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using HotChocolate.Types.Relay;
using HotChocolate.Types;
using HotChocolate;
using System.Threading.Tasks;
using System.Threading;
using Your.Namespace.Api.Data;
using Your.Namespace.Api.DataLoader;

namespace Your.Namespace.Api.Attendees
{
    [ExtendObjectType(Name = "Subscription")]
    public class AttendeeSubscriptions
    {
        [Subscribe(With = nameof(SubscribeToOnAttendeeCheckedInAsync))]
        public SessionAttendeeCheckIn OnAttendeeCheckedIn(
            [ID(nameof(Session))] int sessionId,
            [EventMessage] int attendeeId,
            SessionByIdDataLoader sessionById,
            CancellationToken cancellationToken) =>
            new SessionAttendeeCheckIn(attendeeId, sessionId);

        public async ValueTask<ISourceStream<int>> SubscribeToOnAttendeeCheckedInAsync(
            int sessionId,
            [Service] ITopicEventReceiver eventReceiver,
            CancellationToken cancellationToken) =>
            await eventReceiver.SubscribeAsync<string, int>(
                "OnAttendeeCheckedIn_" + sessionId, cancellationToken);
    }
}
