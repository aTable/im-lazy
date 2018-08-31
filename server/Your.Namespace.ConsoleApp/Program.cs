using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Serilog;
using System;

namespace Your.Namespace.ConsoleApp
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args).ConfigureServices((hostContext, services) =>
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