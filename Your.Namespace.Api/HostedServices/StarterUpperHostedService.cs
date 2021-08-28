using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

public class StarterUpperHostedService : IHostedService, IDisposable
{

    public StarterUpperHostedService(
        ILogger<StarterUpperHostedService> logger,
        LongRunningStartupCheck startupHostedServiceHealthCheck
        )
    {
        Logger = logger;
        StartupHostedServiceHealthCheck = startupHostedServiceHealthCheck;
    }

    public ILogger<StarterUpperHostedService> Logger { get; }
    public LongRunningStartupCheck StartupHostedServiceHealthCheck { get; }
    public Task StartAsync(CancellationToken cancellationToken)
    {
        Logger.LogInformation("Startup Background Service is starting.");

        // add initialization actions here

        Task.Run(async () =>
        {
            await Task.Delay(10000);
            StartupHostedServiceHealthCheck.IsReady = true;
            Logger.LogInformation("Startup Background Service has started.");
        });

        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        Logger.LogInformation("Startup Background Service is stopping.");

        return Task.CompletedTask;
    }

    public void Dispose()
    {
    }
}