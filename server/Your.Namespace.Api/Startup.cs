using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Logging;
using Microsoft.OpenApi.Models;
using Prometheus;
using Serilog;
using Your.Namespace.Api.DataAccess;
using Your.Namespace.Api.GraphSchema.Albums;
using Your.Namespace.Api.GraphSchema.Artists;
using Your.Namespace.Api.GraphSchema.Health;

namespace Your.Namespace.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appSettings = ConfigureAppSettings(services);
            var logger = ConfigureLogger(services);
            ConfigureWebServer(appSettings, services);
            ConfigureGraphQL(appSettings, services);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, AppSettings appSettings, Context context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                IdentityModelEventSource.ShowPII = true;
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your.Namespace.Api v1"));
                app.UsePlayground(queryPath: appSettings.GraphSettings.Path, uiPath: appSettings.GraphSettings.PlaygroundPath);
            }
            else if (env.IsProduction())
            {
                // TODO: configure
            }

            app.UseSerilogRequestLogging();

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(appSettings.CorsPolicyName);

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            var counter = Metrics.CreateCounter(appSettings.ApiName.Replace("-", "_") + "_endpoint_counter", $"Counts requests to the {appSettings.ApiName} endpoints", new CounterConfiguration
            {
                LabelNames = new[] { "method", "endpoint" }
            });
            app.Use((ctx, next) =>
            {
                counter.WithLabels(ctx.Request.Method, ctx.Request.Path).Inc();
                return next();
            });
            app.UseMetricServer();
            app.UseHttpMetrics();

            app.UseGraphQL(path: appSettings.GraphSettings.Path);

            if (appSettings.IsRunMigrations)
            {
                context.Database.EnsureCreated();
                context.Database.Migrate();
            }

            if (appSettings.IsRunSeed)
            {
                SeedData.EnsureSeedData(context);
            }
        }

        private AppSettings ConfigureAppSettings(IServiceCollection services)
        {
            services.Configure<AppSettings>(Configuration.GetSection("App"));
            services.AddSingleton(provider => provider.GetService<IOptions<AppSettings>>().Value);
            var appSettings = new AppSettings();
            Configuration.Bind("App", appSettings);
            return appSettings;
        }
        private Serilog.ILogger ConfigureLogger(IServiceCollection services)
        {
            var logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .CreateLogger();
            Log.Logger = logger; // needed for the middlewares on UseSerilog() and UseSerilogRequestLogging()
            services.AddSingleton<Serilog.ILogger>(provider => logger);

            return logger;
        }

        private void ConfigureGraphQL(AppSettings appSettings, IServiceCollection services)
        {
            services.AddQueryRequestInterceptor((ctx, builder, ct) =>
            {
                var identity = new ClaimsIdentity();
                identity.AddClaim(new Claim(ClaimTypes.Country, "au"));
                ctx.User.AddIdentity(identity);
                return Task.CompletedTask;
            });

            //services.AddInMemorySubscriptionProvider();
            services.AddGraphQL(sp => SchemaBuilder.New()
                 // TODO: registering this seems to override all IntType to PaginationAmtType
                 //.AddType(new PaginationAmountType(appSettings.MaxPageSize))
                 .AddAuthorizeDirectiveType()
                 .ModifyOptions(options =>
                 {

                 })
                 .AddServices(sp)
                 .AddQueryType(d => d.Name("Query"))
                 .AddMutationType(d => d.Name("Mutation"))
                 .AddType<Artist>()
                 .AddType<Album>()
                 .AddType<Health>()
                 //.AddSubscriptionType(d => d.Name("Subscription"))
                 .AddType<HealthQueries>()
                 .AddType<ArtistQueries>()
                 .AddType<ArtistMutations>()
                 .AddType<AlbumQueries>()
                 .AddType<AlbumMutations>()
                 //.AddType<ArtistSubscriptions>()
                 .Create()
            );
        }

        private void ConfigureWebServer(AppSettings appSettings, IServiceCollection services)
        {
            services.AddHttpContextAccessor();

            services.AddCors(options =>
             {
                 options.AddPolicy(appSettings.CorsPolicyName,
                 builder =>
                 {
                     builder.WithOrigins(appSettings.WebClientOrigin).AllowAnyMethod().AllowAnyHeader();
                 });
             });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = appSettings.ApiName, Version = "v1" });
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
                options.AddPolicy(Policies.User, policy => policy.RequireClaim("aud"));
                options.AddPolicy(Policies.God, policy => policy.RequireAssertion(context => context.User.HasClaim(x => x.Type == ClaimTypes.Upn && x.Value == "god")));
            });

            services.AddAuthentication("Bearer")
                    .AddIdentityServerAuthentication(options =>
                    {
                        options.Authority = appSettings.AuthorizationServerUri;
                        options.RequireHttpsMetadata = appSettings.AuthorizationServerRequiresHttps; // TODO: figure cross platform cert shenanigans for https during dev
                        options.ApiName = appSettings.ApiName;
                        //ptions.JwtBearerEvents.AuthenticationFailed

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
    }
}
