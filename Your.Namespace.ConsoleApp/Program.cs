using MassTransit;
using Microsoft.Extensions.Configuration;
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
                    var appSettings = ConfigureAppSettings(hostContext.Configuration, services);
                    var logger = ConfigureLogger(hostContext.Configuration, services);


                    services.AddHostedService<Worker>();

                    services.AddMassTransit(x =>
                    {
                        x.SetKebabCaseEndpointNameFormatter();
                        x.UsingRabbitMq((context, cfg) =>
                        {
                            cfg.Host(
                                host: appSettings.RabbitMqSettings.Host,
                                port: appSettings.RabbitMqSettings.Port,
                                virtualHost: appSettings.RabbitMqSettings.VirtualHost,
                                configure: hostConfigure =>
                                {
                                    hostConfigure.Username(appSettings.RabbitMqSettings.Username);
                                    hostConfigure.Password(appSettings.RabbitMqSettings.Password);
                                }
                            );
                            cfg.ConfigureEndpoints(context);
                        });
                        x.AddConsumer<SomethingHappenedConsumer>();
                    });
                    //services.AddMassTransitHostedService(waitUntilStarted: true);


                    // var busControl = Bus.Factory.CreateUsingRabbitMq(cfg =>
                    // {
                    //     cfg.Host(
                    //         host: appSettings.RabbitMqSettings.Host,
                    //         port: appSettings.RabbitMqSettings.Port,
                    //         virtualHost: appSettings.RabbitMqSettings.VirtualHost,
                    //         configure: hostConfigure =>
                    //         {
                    //             hostConfigure.Username(appSettings.RabbitMqSettings.Username);
                    //             hostConfigure.Password(appSettings.RabbitMqSettings.Password);
                    //         }
                    //     );
                    //     cfg.ReceiveEndpoint("Your.Namespace.Api:SomethingHappened", e =>
                    //     {
                    //         e.Consumer<SomethingHappenedConsumer>();
                    //     });
                    // });

                })
                .UseSerilog()
                ;

        private static AppSettings ConfigureAppSettings(IConfiguration configuration, IServiceCollection services)
        {
            services.Configure<AppSettings>(configuration.GetSection("App"));
            services.AddSingleton(provider => provider.GetService<IOptions<AppSettings>>().Value);
            var appSettings = new AppSettings();
            configuration.Bind("App", appSettings);
            return appSettings;
        }

        private static Serilog.ILogger ConfigureLogger(IConfiguration configuration, IServiceCollection services)
        {
            var logger = new LoggerConfiguration()
                .ReadFrom.Configuration(configuration)
                .CreateLogger();
            Log.Logger = logger; // needed for the middlewares on UseSerilog() and UseSerilogRequestLogging()
            services.AddSingleton<Serilog.ILogger>(provider => logger);

            return logger;
        }
    }

}