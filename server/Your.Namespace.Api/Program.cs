using System;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;
namespace Your.Namespace.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            Console.WriteLine("starting");
            System.Diagnostics.Trace.WriteLine("starting");
            System.Diagnostics.Debug.WriteLine("starting");
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
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
