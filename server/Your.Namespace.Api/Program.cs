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
      CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            })
            .UseSerilog()
            ;
  }
}
