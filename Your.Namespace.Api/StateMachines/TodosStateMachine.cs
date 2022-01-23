using System;
using Automatonymous;
using MassTransit;
using Your.Namespace.Api.Events;

namespace Your.Namespace.Api.StateMachines
{
    public class TodosStateMachine : MassTransitStateMachine<ComplexProcessState>
    {
        public TodosStateMachine()
        {
            InstanceState(x =>
                x.CurrentState,
                Preprocessing,
                ProcessingStepOne,
                ProcessingStepTwo,
                ProcessingStepThree,
                ProcessingCompleted
            );

            Initially(
                When(ReportRequest).TransitionTo(Preprocessing),
                When(PreprocessingCompleted).TransitionTo(ProcessingStepOne),
                When(ProcessingStepOneCompleted).TransitionTo(ProcessingStepTwo),
                When(ProcessingStepTwoCompleted).TransitionTo(ProcessingStepThree),
                When(ProcessingStepThreeCompleted).TransitionTo(ProcessingCompleted)
            );

            DuringAny(
                When(ReportRequest)
                .TransitionTo(Preprocessing)
                );

            DuringAny(When(FullProcessingCompleted).Finalize());
            DuringAny(When(FullProcessingCompleted).Then(ctx => Console.WriteLine("saga completed: " + ctx.Instance.CorrelationId)));

            SetCompletedWhenFinalized();
        }
        public State Preprocessing { get; set; }
        public State ProcessingStepOne { get; private set; }
        public State ProcessingStepTwo { get; private set; }
        public State ProcessingStepThree { get; private set; }
        public State ProcessingCompleted { get; private set; }
        public Event<IReportRequest> ReportRequest { get; private set; }
        public Event<IReportRequestReceived> ReportRequestReceived { get; private set; }
        public Event<IPreprocessingCompleted> PreprocessingCompleted { get; private set; }
        public Event<IProcessingStepOneCompleted> ProcessingStepOneCompleted { get; private set; }
        public Event<IProcessingStepTwoCompleted> ProcessingStepTwoCompleted { get; private set; }
        public Event<IProcessingStepThreeCompleted> ProcessingStepThreeCompleted { get; private set; }
        public Event<IProcessingCompleted> FullProcessingCompleted { get; private set; }
    }

    public class ComplexProcessState : SagaStateMachineInstance
    {
        public Guid CorrelationId { get; set; }
        public int CurrentState { get; set; }
        public DateTime ScheduledDateTimeUtc { get; set; }
    }
}