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

namespace Your.Namespace.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("GetEnvironmentVariables: ");
            foreach (DictionaryEntry de in Environment.GetEnvironmentVariables())
                Console.WriteLine("\t{0} = {1}", de.Key, de.Value);

            var host = CreateHostBuilder(args).Build();

            var cancellationTokenSource = new CancellationTokenSource();
            using (var scope = host.Services.CreateScope())
            {
                var appSettings = scope.ServiceProvider.GetRequiredService<AppSettings>();
                using (var context = scope.ServiceProvider.GetRequiredService<Your.Namespace.Api.DataAccess.Context>())
                {
                    if (appSettings.IsRunMigrations)
                        context.Database.Migrate();

                    if (appSettings.IsRunSeed)
                        SeedData.EnsureSeedData(context);
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureKestrel(options =>
                    {
                        options.AllowSynchronousIO = true;
                    });
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureAppConfiguration(builder =>
                {
                    //throw new Exception(System.Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT"));
                })
                .UseSerilog()
                ;
    }
}
