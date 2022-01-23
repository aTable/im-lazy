using System;
using MassTransit;

namespace Your.Namespace.Api.Events
{
    public interface IProcessingStepOneCompleted : CorrelatedBy<Guid>
    {

    }
}