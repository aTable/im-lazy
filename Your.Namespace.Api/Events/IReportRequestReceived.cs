using System;
using MassTransit;

namespace Your.Namespace.Api.Events
{
    public interface IReportRequestReceived : CorrelatedBy<Guid>
    {
        DateTime RequestedAtDateTimeUtc { get; set; }
        string CustomerId { get; set; }
        int ReportId { get; set; }
    }
}