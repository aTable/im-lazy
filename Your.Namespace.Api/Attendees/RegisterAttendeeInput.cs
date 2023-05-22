namespace Your.Namespace.Api.Attendees
{
    public record RegisterAttendeeInput(
         string FirstName,
         string LastName,
         string UserName,
         string EmailAddress);
}
