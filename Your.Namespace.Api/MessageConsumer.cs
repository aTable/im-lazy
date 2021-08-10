using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Microsoft.Extensions.DependencyInjection;
using Your.Namespace.Api.DataAccess;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Threading;
using MassTransit;

namespace Your.Namespace.Api
{
    public class Message
    {
        public string Text { get; set; }
    }

    public class MessageConsumer : IConsumer<Message>
    {
        public MessageConsumer(ILogger<MessageConsumer> logger)
        {
            Logger = logger;
        }

        public ILogger<MessageConsumer> Logger { get; set; }
        public Task Consume(ConsumeContext<Message> context)
        {
            Logger.LogInformation("Received text: {Text}", context.Message.Text);
            return Task.CompletedTask;
        }
    }
}
