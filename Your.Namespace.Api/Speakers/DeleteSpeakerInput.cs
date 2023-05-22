using HotChocolate.Types.Relay;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Speakers
{
    public record DeleteSpeakerInput([ID(nameof(Speaker))] int Id);
}
