using System;
using MassTransit;

namespace Your.Namespace.Api.Events
{
    public interface IProcessingStepTwoCompleted : CorrelatedBy<Guid>
    {

    }
}