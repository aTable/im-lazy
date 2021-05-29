using System.Linq;
using Your.Namespace.IdentityServer.DataAccess;
using Your.Namespace.IdentityServer.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using IdentityServer4;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using Serilog.Core;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using IdentityServer4.EntityFramework.DbContexts;

namespace Your.Namespace.IdentityServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment hostEnvironment)
        {
            Configuration = configuration;
            HostEnvironment = hostEnvironment;
        }

        private string _identityOrigins => "_IdentitySpecificOrigins";
        private string _migrationsAssemblyName = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;
        public IConfiguration Configuration { get; }
        public IWebHostEnvironment HostEnvironment { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppSettings>(Configuration.GetSection("App"));
            services.AddSingleton<AppSettings>(provider => provider.GetService<IOptions<AppSettings>>().Value);
            var appSettings = new AppSettings();
            Configuration.Bind("App", appSettings);

            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .CreateLogger();
            services.AddTransient<ILogger>(provider => Log.Logger);

            var identityServerConnectionString = Configuration.GetConnectionString("IdentityConnectionString");

            services.AddCors(options =>
            {
                options.AddPolicy(_identityOrigins, builder =>
                {
                    builder.WithOrigins(appSettings.WebClientOrigin).AllowAnyHeader().AllowAnyMethod();
                });
            });

            services.AddDbContext<Context>(options => options.UseSqlite(identityServerConnectionString));
            services.AddIdentity<ApplicationUser, IdentityRole>()
               .AddEntityFrameworkStores<Context>()
               .AddDefaultTokenProviders();

            services.AddMvc(options =>
            {
                options.EnableEndpointRouting = false;
            });

            var identityServerBuilder = services.AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;
            })
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = b =>
                        b.UseSqlite(identityServerConnectionString, sql => sql.MigrationsAssembly(_migrationsAssemblyName));
                })
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = b =>
                        b.UseSqlite(identityServerConnectionString, sql => sql.MigrationsAssembly(_migrationsAssemblyName));
                    options.EnableTokenCleanup = true;// this enables automatic token cleanup. this is optional.
                })
                .AddInMemoryApiScopes(Config.GetApiScopes())
                //.AddProfileService<ProfileService>();
                .AddAspNetIdentity<ApplicationUser>();

            if (HostEnvironment.IsDevelopment())
            {
                identityServerBuilder.AddDeveloperSigningCredential(filename: "tempkey.rsa");
            }
            else
            {
                var certKey = Configuration[appSettings.AzureKeyVault.CertName];
                var pfxBytes = Convert.FromBase64String(certKey);
                var cert = new X509Certificate2(pfxBytes, (string)null, X509KeyStorageFlags.MachineKeySet);
                identityServerBuilder.AddSigningCredential(cert);
            }

            services.AddAuthentication(options =>
            {
            });
            // .AddOpenIdConnect("aad", "Login with Azure AD", options =>
            // {
            //     options.CallbackPath = "/signin-oidc";

            //     var authority = appSettings.AzureOIDC.Authority;
            //     if (string.IsNullOrWhiteSpace(authority))
            //         throw new NullReferenceException("config problem: identity server requires an authority. Leaving this null seems to cause problemos");
            //     options.Authority = authority;
            //     options.ClientId = appSettings.AzureOIDC.ClientId;
            //     options.ClientSecret = appSettings.AzureOIDC.ClientSecret;
            //     options.ResponseType = "code id_token";
            //     options.TokenValidationParameters = new TokenValidationParameters
            //     {
            //         //NameClaimType = "sub",
            //         //RoleClaimType = "role",
            //         ValidateIssuer = false,
            //     };
            //     //options.GetClaimsFromUserInfoEndpoint = true;
            // });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, AppSettings appSettings, Context context, PersistedGrantDbContext persistedGrantDbContext, ConfigurationDbContext configurationDbContext, UserManager<ApplicationUser> userManager)
        {
            app.UseCors(_identityOrigins);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
            }
            //app.UseSerilogRequestLogging();
            app.UseIdentityServer();
            // app.UseHttpsRedirection(); // TODO: figure cross platform cert shenanigans
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();

            if (appSettings.IsRunMigrations)
            {
                context.Database.Migrate();
                persistedGrantDbContext.Database.Migrate();
                configurationDbContext.Database.Migrate();
            }

            if (appSettings.IsRunSeed)
            {
                SeedData.EnsureSeedData(context, persistedGrantDbContext, configurationDbContext, userManager);
            }
        }
    }
}