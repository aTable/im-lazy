using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Your.Namespace.AuthorizationServer
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            System.IO.File.Delete("yournamespaceauthorizationserver.db");
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(builder => builder.UseStartup<Startup>());
    }
}
