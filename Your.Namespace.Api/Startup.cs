using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using FluentValidation.AspNetCore;
using HotChocolate;
using HotChocolate.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
using Your.Namespace.Api.Validators;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using System.Text.Json;
using System.Net.Mime;
using System.IO;
using OpenIddict.Validation.AspNetCore;
using OpenIddict.Validation.SystemNetHttp;
using OpenTelemetry.Trace;
using Jaeger;
using Jaeger.Reporters;
using Jaeger.Samplers;
using Jaeger.Senders;
using Jaeger.Senders.Thrift;
using OpenTelemetry.Exporter;
using OpenTelemetry.Resources;
using OpenTelemetry;
using Your.Namespace.Api.Controllers;
using MassTransit;

namespace Your.Namespace.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment hostEnvironment)
        {
            Configuration = configuration;
            HostEnvironment = hostEnvironment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment HostEnvironment { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            var appSettings = ConfigureAppSettings(services);
            var logger = ConfigureLogger(services);
            ConfigureWebServer(appSettings, services);
            ConfigureGraphQL(appSettings, services);
            ConfigureHealthChecks(appSettings, services);
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
                endpoints.MapHealthChecks("/health", new HealthCheckOptions
                {
                    ResponseWriter = async (context, report) =>
                    {
                        var result = JsonSerializer.Serialize(
                            new
                            {
                                status = report.Status.ToString(),
                                monitors = report.Entries.Select(e => new { key = e.Key, value = Enum.GetName(typeof(HealthStatus), e.Value.Status) })
                            });
                        context.Response.ContentType = MediaTypeNames.Application.Json;
                        await context.Response.WriteAsync(result);
                    },
                });
                endpoints.MapControllers();
            });

            ConfigurePrometheus(app, appSettings);

            app.UseGraphQL(path: appSettings.GraphSettings.Path);
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

        private void ConfigureHealthChecks(AppSettings appSettings, IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("ConnectionString");

            services.AddHealthChecks()
                .AddCheck(
                    name: "local-volume",
                    check: () =>
                    {
                        var logDirectoryExists = Directory.Exists("logs");
                        return new HealthCheckResult(status: logDirectoryExists ? HealthStatus.Healthy : HealthStatus.Degraded);
                    }
                )
                .AddAsyncCheck(
                    name: "sqlite",
                    check: async cancellationToken =>
                    {
                        try
                        {
                            using var conn = new SqliteConnection(connectionString);
                            await conn.OpenAsync(cancellationToken);
                            return new HealthCheckResult(status: HealthStatus.Healthy);
                        }
                        catch
                        {
                            return new HealthCheckResult(status: HealthStatus.Unhealthy);
                        }
                    },
                    tags: new[] { "db", "storage" },
                    timeout: TimeSpan.FromSeconds(5)
                // ).AddCheck(
                //     name: "masstransit",
                //     check: (j) =>
                //     {
                //         j.Contains
                //     }
                // )
                ;
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
            }).AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<PlaceholderValidator>();
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy(Policies.User, policy => policy.RequireClaim("aud"));
                options.AddPolicy(Policies.God, policy => policy.RequireAssertion(context => context.User.HasClaim(x => x.Type == ClaimTypes.Upn && x.Value == "god")));
            });

            services.AddHttpClient(typeof(OpenIddictValidationSystemNetHttpOptions).Assembly.GetName().Name)
                .ConfigurePrimaryHttpMessageHandler(_ => new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
                });
            services.AddAuthentication(options =>
                        {
                            options.DefaultScheme = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme;
                        });
            services.AddOpenIddict()
                .AddValidation(options =>
                {
                    // Note: the validation handler uses OpenID Connect discovery
                    // to retrieve the address of the introspection endpoint.
                    options.SetIssuer("https://localhost:44319/");
                    options.AddAudiences("yournamespaceapi");

                    // Configure the validation handler to use introspection and register the client
                    // credentials used when communicating with the remote introspection endpoint.
                    options.UseIntrospection()
                        .SetClientId("yournamespaceapi")
                        .SetClientSecret("846B62D0-DEF9-4215-A99D-86E6B8DAB343");

                    // Register the System.Net.Http integration.
                    options.UseSystemNetHttp();

                    // Register the ASP.NET Core host.
                    options.UseAspNetCore();
                });
            // services.AddAuthentication("Bearer")
            //         .AddIdentityServerAuthentication(options =>
            //         {
            //             options.Authority = appSettings.AuthorizationServerUri;
            //             options.RequireHttpsMetadata = appSettings.AuthorizationServerRequiresHttps; // TODO: figure cross platform cert shenanigans for https during dev
            //             options.ApiName = appSettings.ApiName;
            //             //options.JwtBearerEvents.AuthenticationFailed
            //             options.Validate();
            //         });
            services.AddHttpClient("httpclient", (serviceProvider, httpClient) =>
            {
                httpClient.Timeout = TimeSpan.FromSeconds(10);
            }).ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler
            {
                ClientCertificateOptions = ClientCertificateOption.Manual,
                ServerCertificateCustomValidationCallback = (httpRequestMessage, cert, cetChain, policyErrors) =>
                {
                    return true;
                }
            });
            services.AddScoped<HttpClient>(provider => provider.GetService<IHttpClientFactory>().CreateClient("httpclient"));

            var g = typeof(Startup).Assembly.GetName();

            services.AddMemoryCache(options => { });
            var metricsPath = new PathString("/metrics");
            services.AddOpenTelemetryTracing(builder =>
            {
                if (HostEnvironment.IsDevelopment())
                    builder.AddConsoleExporter(options => options.Targets = ConsoleExporterOutputTargets.Debug);
                builder
                    .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(HostEnvironment.ApplicationName))
                    .SetSampler(new AlwaysOnSampler())
                    // .AddRequestCollector()
                    .AddSource(nameof(WeatherForecastController), nameof(TestController))
                    .AddHttpClientInstrumentation()
                    .AddAspNetCoreInstrumentation((options) =>
                    {
                        options.RecordException = true;
                        options.Filter = httpContext =>
                        {
                            return true;
                            // return httpContext.Request.Path != metricsPath;
                        };
                        options.Enrich = (activity, eventName, rawObject) =>
                        {
                            if (eventName.Equals("OnStartActivity"))
                            {
                                if (rawObject is HttpRequest httpRequest)
                                {
                                    activity.SetTag("requestProtocol", httpRequest.Protocol);
                                }
                            }
                            else if (eventName.Equals("OnStopActivity"))
                            {
                                if (rawObject is HttpResponse httpResponse)
                                {
                                    activity.SetTag("responseLength", httpResponse.ContentLength);
                                }
                            }
                        };
                    })
                    .AddJaegerExporter();
            });

            var connectionString = Configuration.GetConnectionString("ConnectionString");
            services.AddDbContext<Context>(options => options.UseSqlite(connectionString));

            services.AddMassTransit(x =>
            {
                x.SetKebabCaseEndpointNameFormatter();
                x.UsingInMemory((context, cfg) =>
                {
                    cfg.ConfigureEndpoints(context);
                });
                // x.UsingRabbitMq((context, cfg) =>
                // {
                //     cfg.ConfigureEndpoints(context);
                // });
                x.AddConsumer<MessageConsumer>();
            });
            services.AddMassTransitHostedService(waitUntilStarted: true);
            services.AddHostedService<Worker>();

        }

        private void ConfigurePrometheus(IApplicationBuilder app, AppSettings appSettings)
        {
            var httpRequestCounter = Metrics.CreateCounter("http_requests_total", $"Counts requests to the {appSettings.ApiName} endpoints", new CounterConfiguration());
            app.Use((ctx, next) =>
            {
                httpRequestCounter.Inc();
                return next();
            });
            var endpointCounter = Metrics.CreateCounter(appSettings.ApiName.Replace("-", "_") + "_endpoint_counter", $"Counts requests to the {appSettings.ApiName} endpoints", new CounterConfiguration
            {
                LabelNames = new[] { "method", "endpoint" }
            });
            app.Use((ctx, next) =>
            {
                endpointCounter.WithLabels(ctx.Request.Method, ctx.Request.Path).Inc();
                return next();
            });
            app.UseMetricServer();
            app.UseHttpMetrics();
        }
    }
}
