using HotChocolate.Types.Relay;
using System;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Sessions
{
    public record ScheduleSessionInput(
         [ID(nameof(Session))]
        int SessionId,
         [ID(nameof(Track))]
        int TrackId,
         DateTimeOffset StartTime,
         DateTimeOffset EndTime);
}
