using System;

namespace Your.Namespace.Api.Events
{
    public interface ISomethingHappened
    {
        string Description { get; }
        DateTimeOffset DateTimeNow { get; }
    }
    public class SomethingHappened : ISomethingHappened
    {
        public string Description { get; set; }
        public DateTimeOffset DateTimeNow { get; set; }
    }
}