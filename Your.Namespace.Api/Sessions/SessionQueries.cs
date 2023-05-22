using HotChocolate.Types.Relay;
using HotChocolate.Types;
using HotChocolate;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading;
using Your.Namespace.Api.Data;
using Your.Namespace.Api.DataAccess;
using Your.Namespace.Api.DataLoader;
using Your.Namespace.Api.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Your.Namespace.Api.Types;

namespace Your.Namespace.Api.Sessions
{
    [ExtendObjectType("Query")]
    public class SessionQueries
    {
        [UseApplicationDbContext]
        [UsePaging(typeof(NonNullType<SessionType>))]
        [HotChocolate.Data.UseFiltering(typeof(SessionFilterInputType))]
        [HotChocolate.Data.UseSorting]
        public IQueryable<Session> GetSessions(
     [ScopedService] ApplicationDbContext context) =>
     context.Sessions;

        public Task<Session> GetSessionByIdAsync(
            [ID(nameof(Session))] int id,
            SessionByIdDataLoader sessionById,
            CancellationToken cancellationToken) =>
            sessionById.LoadAsync(id, cancellationToken);

        public async Task<IEnumerable<Session>> GetSessionsByIdAsync(
            [ID(nameof(Session))] int[] ids,
            SessionByIdDataLoader sessionById,
            CancellationToken cancellationToken) =>
            await sessionById.LoadAsync(ids, cancellationToken);
    }
}
