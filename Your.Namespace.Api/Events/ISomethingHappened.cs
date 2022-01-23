using System;

namespace Your.Namespace.Api.Events
{
    public interface ISomethingHappened
    {
        string Description { get; }
        DateTimeOffset DateTimeNow { get; }
    }
}