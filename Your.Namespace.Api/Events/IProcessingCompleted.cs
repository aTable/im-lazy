using System;
using MassTransit;

namespace Your.Namespace.Api.Events
{
    public interface IProcessingCompleted : CorrelatedBy<Guid>
    {

    }
}