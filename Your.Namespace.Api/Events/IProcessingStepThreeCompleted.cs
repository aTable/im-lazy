using System;
using MassTransit;

namespace Your.Namespace.Api.Events
{
    public interface IProcessingStepThreeCompleted : CorrelatedBy<Guid>
    {

    }
}