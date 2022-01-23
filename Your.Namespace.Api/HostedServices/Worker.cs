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
using Your.Namespace.Api.Events;

namespace Your.Namespace.Api.HostedServices
{
    public class Worker : BackgroundService
    {
        public Worker(
            ILogger<Worker> logger,
            IBus bus
            )
        {
            Logger = logger;
            Bus = bus;
        }

        public ILogger<Worker> Logger { get; }
        public IBus Bus { get; set; }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var now = DateTimeOffset.Now;
                //Logger.LogInformation($"Publishing something happened at {now.ToLocalTime()}");
                await Bus.Publish<ISomethingHappened>(new
                {
                    Description = $"The time is {now}",
                    DateTimeNow = now,
                });
                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}
