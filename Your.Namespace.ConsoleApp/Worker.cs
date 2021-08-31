using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MassTransit;

namespace Your.Namespace.ConsoleApp
{
    public class Worker : IHostedService
    {
        public Worker(AppSettings appSettings, ILogger<Worker> logger, IBusControl busControl)
        {
            AppSettings = appSettings;
            Logger = logger;
            BusControl = busControl;
        }

        public AppSettings AppSettings { get; }
        public ILogger<Worker> Logger { get; }
        public IBusControl BusControl { get; }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            var source = new CancellationTokenSource();
            await BusControl.StartAsync(source.Token);
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            Logger.LogInformation("shutting down ...");
            await BusControl.StopAsync();
        }
    }
}