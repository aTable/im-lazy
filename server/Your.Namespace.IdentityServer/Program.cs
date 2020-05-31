using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace Your.Namespace.IdentityServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .ConfigureAppConfiguration((hostingContext, configurationBuilder) =>
                    {
                        var config = configurationBuilder.Build();
                        var appSettings = new AppSettings();
                        config.Bind("App", appSettings);
                        if (hostingContext.HostingEnvironment.IsProduction())
                        {
                            configurationBuilder.AddAzureKeyVault(
                                vault: appSettings.AzureKeyVault.Uri.ToString(),
                                clientId: appSettings.AzureOIDC.ClientId,
                                clientSecret: appSettings.AzureOIDC.ClientSecret
                            );
                        }
                    })
                 .UseSerilog();
    }
}