using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Your.Namespace.ConsoleApp
{
    public class Worker : IHostedService
    {
        public Worker(AppSettings appSettings, ILogger<Worker> logger)
        {
            AppSettings = appSettings;
        }

        public AppSettings AppSettings { get; }
        public ILogger<Worker> Logger { get; }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await Task.FromResult(true);
            for (var i = 0; i < AppSettings.SayHelloWorldThisManyTimes; i++)
                Logger.LogInformation($"Hello World");
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            Logger.LogInformation("shutting down ...");
            return Task.CompletedTask;
        }
    }
}