using HotChocolate.Types.Relay;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Speakers
{
    public record UpdateSpeakerInput(
      [ID(nameof(Speaker))]int SpeakerId,
      string Name,
      string? Bio,
      string? WebSite);
}
