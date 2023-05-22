using HotChocolate.Types;
using HotChocolate;
using System.Threading.Tasks;
using System.Threading;
using Your.Namespace.Api.Data;
using Your.Namespace.Api.DataLoader;

namespace Your.Namespace.Api.Sessions
{
    [ExtendObjectType(Name = "Subscription")]
    public class SessionSubscriptions
    {
        [Subscribe]
        [Topic]
        public Task<Session> OnSessionScheduledAsync(
            [EventMessage] int sessionId,
            SessionByIdDataLoader sessionById,
            CancellationToken cancellationToken) =>
            sessionById.LoadAsync(sessionId, cancellationToken);
    }
}
