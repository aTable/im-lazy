using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Serilog;
using System.Net.Http;
using Your.Namespace.Api.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Prometheus;
using GraphQL.Server.Ui.GraphiQL;
using GraphQL.Server;
using GraphQL;
using GraphQL.Http;
using GraphQL.Types;
using Your.Namespace.Api.GraphSchema;
using GraphQL.Server.Ui.Playground;

namespace Your.Namespace.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var appSettings = ConfigureAppSettings(services);
            var logger = ConfigureLogger(services);
            services.AddScoped<IDocumentExecuter, DocumentExecuter>();
            services.AddScoped<IDocumentWriter, DocumentWriter>();
            //services.AddScoped<MyGraphData>();
            services.AddScoped<MyGraphQuery>();
            services.AddScoped<MyGraphMutation>();
            services.AddScoped<ISchema, MyGraphSchema>();
            services.AddScoped<IDependencyResolver>(provider => new FuncDependencyResolver(provider.GetService));
            services.AddGraphQL(opts =>
            {
                opts.EnableMetrics = true;
                opts.ExposeExceptions = true;
            }).AddGraphTypes(ServiceLifetime.Scoped);


            services.AddHttpContextAccessor();
            services.AddCors(options =>
             {
                 options.AddPolicy(appSettings.CorsPolicyName,
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
                        options.ApiName = appSettings.ApiName;
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

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, AppSettings appSettings)
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
            app.UseSerilogRequestLogging();

            //app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(appSettings.CorsPolicyName);
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseMetricServer();
            app.UseGraphQL<ISchema>();
            app.UseGraphiQLServer(new GraphiQLOptions { });
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions { });
        }

        private AppSettings ConfigureAppSettings(IServiceCollection services)
        {
            services.Configure<AppSettings>(Configuration.GetSection("App"));
            services.AddSingleton(provider => provider.GetService<IOptions<AppSettings>>().Value);
            var appSettings = new AppSettings();
            Configuration.Bind("App", appSettings);
            return appSettings;
        }
        private ILogger ConfigureLogger(IServiceCollection services)
        {
            var logger = new LoggerConfiguration()
                        .ReadFrom.Configuration(Configuration)
                        .CreateLogger();
            Log.Logger = logger; // needed for the middlewares on UseSerilog() and UseSerilogRequestLogging()
            services.AddSingleton<ILogger>(provider => logger);
            return logger;
        }
    }
}
