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
    public class Worker : BackgroundService
    {
        public Worker(IBus bus)
        {
            Bus = bus;
        }
        public IBus Bus { get; set; }


        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await Bus.Publish(new Message { Text = $"The time is {DateTimeOffset.Now}" });

                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}
