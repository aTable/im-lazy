using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OpenIddict.Abstractions;
using Your.Namespace.AuthorizationServer.Models;
using static OpenIddict.Abstractions.OpenIddictConstants;

namespace Your.Namespace.AuthorizationServer
{
    public class Worker : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;

        public Worker(IServiceProvider serviceProvider)
            => _serviceProvider = serviceProvider;

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            await context.Database.EnsureCreatedAsync();

            await CreateUsers();
            await CreateApplicationsAsync();
            await CreateScopesAsync();

            async Task CreateUsers()
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                if (await userManager.FindByIdAsync("test@test.com") == null)
                {
                    var user = new ApplicationUser { UserName = "test@test.com", Email = "test@test.com" };
                    var result = await userManager.CreateAsync(user, "Password1!");
                    if (result.Succeeded)
                    {
                    }
                    else
                    {

                    }
                }
            };
            async Task CreateApplicationsAsync()
            {
                var manager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();
                if (await manager.FindByClientIdAsync("web-client") == null)
                {
                    var descriptor = new OpenIddictApplicationDescriptor
                    {
                        ClientId = "web-client",
                        DisplayName = "SPA client application",
                        PostLogoutRedirectUris =
                        {
                            new Uri("https://localhost:3000/")
                        },
                        RedirectUris =
                        {
                            new Uri("https://localhost:3000/")
                        },
                        Permissions =
                        {
                            Permissions.Endpoints.Authorization,
                            Permissions.Endpoints.Logout,
                            Permissions.GrantTypes.Implicit,
                            Permissions.ResponseTypes.IdToken,
                            Permissions.ResponseTypes.IdTokenToken,
                            Permissions.ResponseTypes.Token,
                            Permissions.Scopes.Email,
                            Permissions.Scopes.Profile,
                            Permissions.Scopes.Roles,
                            Permissions.Prefixes.Scope + "api1",
                            Permissions.Prefixes.Scope + "api2",
                            Permissions.Prefixes.Scope + "yournamespaceapi.app_access",
                            "yournamespaceapi.app_access",
                            Permissions.Prefixes.Scope + "yournamespaceapi.full_access",
                            "yournamespaceapi.full_access"
                        }
                    };

                    await manager.CreateAsync(descriptor);
                }
                if (await manager.FindByClientIdAsync("aurelia") == null)
                {
                    var descriptor = new OpenIddictApplicationDescriptor
                    {
                        ClientId = "aurelia",
                        DisplayName = "Aurelia client application",
                        PostLogoutRedirectUris =
                        {
                            new Uri("https://localhost:44398/signout-oidc")
                        },
                        RedirectUris =
                        {
                            new Uri("https://localhost:44398/signin-oidc")
                        },
                        Permissions =
                        {
                            Permissions.Endpoints.Authorization,
                            Permissions.Endpoints.Logout,
                            Permissions.GrantTypes.Implicit,
                            Permissions.ResponseTypes.IdToken,
                            Permissions.ResponseTypes.IdTokenToken,
                            Permissions.ResponseTypes.Token,
                            Permissions.Scopes.Email,
                            Permissions.Scopes.Profile,
                            Permissions.Scopes.Roles,
                            Permissions.Prefixes.Scope + "api1",
                            Permissions.Prefixes.Scope + "api2"
                        }
                    };

                    await manager.CreateAsync(descriptor);
                }

                if (await manager.FindByClientIdAsync("resource_server_1") == null)
                {
                    var descriptor = new OpenIddictApplicationDescriptor
                    {
                        ClientId = "resource_server_1",
                        ClientSecret = "846B62D0-DEF9-4215-A99D-86E6B8DAB342",
                        Permissions =
                        {
                            Permissions.Endpoints.Introspection
                        }
                    };

                    await manager.CreateAsync(descriptor);
                }

                if (await manager.FindByClientIdAsync("yournamespaceapi") == null)
                {
                    var descriptor = new OpenIddictApplicationDescriptor
                    {
                        ClientId = "yournamespaceapi",
                        ClientSecret = "846B62D0-DEF9-4215-A99D-86E6B8DAB343",
                        Permissions =
                        {
                            Permissions.Endpoints.Introspection,

                        }
                    };

                    await manager.CreateAsync(descriptor);
                }

                // Note: no client registration is created for resource_server_2
                // as it uses local token validation instead of introspection.
            }

            async Task CreateScopesAsync()
            {
                var manager = scope.ServiceProvider.GetRequiredService<IOpenIddictScopeManager>();
                if (await manager.FindByNameAsync("yournamespaceapi.app_access") == null)
                {
                    var descriptor = new OpenIddictScopeDescriptor
                    {
                        Name = "yournamespaceapi.app_access",
                        Resources =
                        {
                            "resource_server_1",
                            "yournamespaceapi"
                        }
                    };

                    await manager.CreateAsync(descriptor);
                }
                if (await manager.FindByNameAsync("yournamespaceapi.full_access") == null)
                {
                    var descriptor = new OpenIddictScopeDescriptor
                    {
                        Name = "yournamespaceapi.full_access",
                        Resources =
                        {
                            "resource_server_1",
                            "yournamespaceapi"
                        }
                    };

                    await manager.CreateAsync(descriptor);
                }
                if (await manager.FindByNameAsync("api1") == null)
                {
                    var descriptor = new OpenIddictScopeDescriptor
                    {
                        Name = "api1",
                        Resources =
                        {
                            "resource_server_1"
                        }
                    };

                    await manager.CreateAsync(descriptor);
                }

                if (await manager.FindByNameAsync("api2") == null)
                {
                    var descriptor = new OpenIddictScopeDescriptor
                    {
                        Name = "api2",
                        Resources =
                        {
                            "resource_server_2"
                        }
                    };

                    await manager.CreateAsync(descriptor);
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken) => Task.CompletedTask;
    }
}
