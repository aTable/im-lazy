
using Automatonymous;

namespace Your.Namespace.Api.StateMachines
{
    class Relationship
    {
        public State CurrentState { get; set; }
        public string Name { get; set; }
    }

    class RelationshipStateMachine :
        AutomatonymousStateMachine<Relationship>
    {
        public RelationshipStateMachine()
        {
            Event(() => Hello);
            Event(() => PissOff);
            Event(() => Introduce);

            State(() => Friend);
            State(() => Enemy);

            Initially(
                When(Hello)
                    .TransitionTo(Friend),
                When(PissOff)
                    .TransitionTo(Enemy),
                When(Introduce)
                    .Then(ctx => ctx.Instance.Name = ctx.Data.Name)
                    .TransitionTo(Friend)
            );
        }

        public State Friend { get; private set; }
        public State Enemy { get; private set; }

        public Event Hello { get; private set; }
        public Event PissOff { get; private set; }
        public Event<Person> Introduce { get; private set; }
    }

    class Person
    {
        public string Name { get; set; }
    }
}