using HotChocolate.Types.Relay;
using System.Collections.Generic;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Sessions
{
    public record AddSessionInput(
       string Title,
       string? Abstract,
       [ID(nameof(Speaker))]
        IReadOnlyList<int> SpeakerIds);
}
