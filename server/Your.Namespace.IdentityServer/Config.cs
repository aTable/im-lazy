// Copyright (c) Brock Allen & Dominick Baier. All rights reserved. Licensed under the Apache
// License, Version 2.0. See LICENSE in the project root for license information.

using IdentityServer4;
using IdentityServer4.Models;
using System.Collections.Generic;

namespace Your.Namespace.IdentityServer
{
    public class Config
    {
        // TODO: submit PR to IdentityServer docs stating this is for claims in ID TOKEN
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
            };
        }

        // TODO: submit PR to IdentityServer docs stating this is for claims in ACCESS TOKEN
        public static IEnumerable<ApiResource> GetApis()
        {
            return new List<ApiResource>
            {
                new ApiResource("MyAwesome-API", "The best API ever seen") {
                    Scopes = new List<Scope>
                    {
                        new Scope { Name = "myawesomeapi.full_access", DisplayName = "Full Access", Description = "Full access to my awesome API" },
                        new Scope { Name = "myawesomeapi.app_access", DisplayName = "App access", Description = "Some other scope.." },
                    }
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "single-page-app",
                    ClientName = "My Awesome API",
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RequireConsent = false, // enables silent renew
                    RedirectUris = {
                        "https://localhost:3000/",
                    },
                    PostLogoutRedirectUris = {
                        "https://localhost:3000/logged-out",
                    },
                    AllowedCorsOrigins = {
                        "https://localhost:3000",
                    },
                    //AccessTokenLifetime = 80,
                    //IdentityTokenLifetime = 80,
                    //AbsoluteRefreshTokenLifetime = 80,
                    //AuthorizationCodeLifetime = 80,
                    //SlidingRefreshTokenLifetime = 80,
                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        IdentityServerConstants.StandardScopes.Email,
                        "myawesomeapi.full_access",
                        "myawesomeapi.app_access",
                    },
                }
            };
        }
    }
}