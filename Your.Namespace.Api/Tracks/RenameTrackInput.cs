using HotChocolate.Types.Relay;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Tracks
{
    public record RenameTrackInput([ID(nameof(Track))] int Id, string Name);
}
