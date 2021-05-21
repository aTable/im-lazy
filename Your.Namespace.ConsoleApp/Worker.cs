using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Your.Namespace.ConsoleApp
{
    public class Worker : IHostedService
    {
        public Worker(AppSettings appSettings, ILogger logger)
        {
            AppSettings = appSettings;
            Logger = logger.ForContext<Worker>();
        }

        public AppSettings AppSettings { get; }
        public ILogger Logger { get; }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await Task.FromResult(true);
            for (var i = 0; i < AppSettings.SayHelloWorldThisManyTimes; i++)
                Logger.Information($"Hello World");
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            Logger.Information("shutting down ...");
            return Task.CompletedTask;
        }
    }
}