namespace Your.Namespace.Api.Speakers
{
    public record AddSpeakerInput(
      string Name,
      string? Bio,
      string? WebSite);
}
