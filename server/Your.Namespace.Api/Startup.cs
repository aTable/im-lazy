using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Serilog;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Converters;
using System.Net.Http;
using Your.Namespace.Api.DataAccess;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;

namespace Your.Namespace.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        private string _corsPolicyName = "_corsPolicyName";
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(provider =>
            {
                var logger = new LoggerConfiguration()
                    .ReadFrom.Configuration(Configuration)
                    .CreateLogger();
                return logger;
            });

            services.Configure<AppSettings>(Configuration.GetSection("App"));
            services.AddSingleton(provider => provider.GetService<IOptions<AppSettings>>().Value);
            var appSettings = new AppSettings();
            Configuration.Bind("App", appSettings);

            services.AddCors(options =>
             {
                 options.AddPolicy(_corsPolicyName,
                 builder =>
                 {
                     builder.WithOrigins(appSettings.WebClientOrigin).AllowAnyMethod().AllowAnyHeader();
                 });
             });
            services.AddControllers(options =>
             {
                 //  var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                 //  options.Filters.Add(new AuthorizeFilter(policy));
             }).AddJsonOptions(options =>
             {
                 options.JsonSerializerOptions.Converters.Add(new System.Text.Json.Serialization.JsonStringEnumConverter());
             });
            services.AddAuthorization(options =>
                       {
                       });

            services.AddAuthentication("Bearer")
                    .AddIdentityServerAuthentication(options =>
                    {
                        options.Authority = appSettings.AuthorizationServerUri;
                        options.RequireHttpsMetadata = false; // TODO: figure cross platform cert shenanigans for https during dev
                        options.ApiName = "MyAwesome-API";
                        options.JwtBearerEvents.OnAuthenticationFailed = (ctx) =>
                        {
                            Log.Information(ctx.Exception, "OnAuthenticationFailed");
                            return Task.CompletedTask;
                        };
                        options.JwtBearerEvents.OnChallenge = ctx =>
                        {
                            Log.Information("OnChallenge");
                            return Task.CompletedTask;
                        };
                        options.JwtBearerEvents.OnMessageReceived = ctx =>
                        {
                            Log.Information($"OnMessageReceived: ");
                            return Task.CompletedTask;
                        };
                        options.JwtBearerEvents.OnTokenValidated = ctx =>
                        {
                            Log.Information($"OnTokenValidated: ");
                            return Task.CompletedTask;
                        };

                        options.Validate();
                    });

            services.AddSingleton(provider => new HttpClient
            {
                Timeout = TimeSpan.FromSeconds(10),
            });

            services.AddMemoryCache(options => { });
            var connectionString = Configuration.GetConnectionString("ConnectionString");
            services.AddDbContext<Context>(options => options.UseSqlite(connectionString));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                IdentityModelEventSource.ShowPII = true;
            }
            else if (env.IsProduction())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(_corsPolicyName);
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
