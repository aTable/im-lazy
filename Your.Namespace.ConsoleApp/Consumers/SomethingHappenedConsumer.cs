using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using MassTransit;
using Microsoft.Extensions.Logging;
using Your.Namespace.Api.Events;

namespace Your.Namespace.ConsoleApp
{
    public class SomethingHappenedConsumer : IConsumer<ISomethingHappened>
    {
        public SomethingHappenedConsumer(ILogger<SomethingHappenedConsumer> logger)
        {
            Logger = logger;
        }

        public ILogger<SomethingHappenedConsumer> Logger { get; }

        public Task Consume(ConsumeContext<ISomethingHappened> context)
        {
            Logger.LogInformation($"Something '{context.Message.Description}' happened at '{context.Message.DateTimeNow}'");
            return Task.CompletedTask;
        }
    }
}