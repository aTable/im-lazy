using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Serilog;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Your.Namespace.ConsoleApp
{
    internal class Program
    {
        private async static Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            //using var scope = host
            var cancellationToken = new CancellationToken(canceled: false);
            await host.RunAsync(cancellationToken);
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureServices((hostContext, services) =>
                {
                    services.Configure<AppSettings>(hostContext.Configuration.GetSection("App"));
                    services.AddSingleton<AppSettings>(provider => provider.GetService<IOptions<AppSettings>>().Value);

                    var logger = new LoggerConfiguration()
                        .ReadFrom.Configuration(hostContext.Configuration)
                        .CreateLogger();
                    services.AddSingleton<ILogger>(logger);
                    services.AddLogging(x =>
                    {
                    });
                    services.AddHostedService<Worker>();
                });
    }
}