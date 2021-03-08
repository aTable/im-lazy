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
            // TODO: resolve SPA not being allowed to access due to audience problem. Hacky fix to have api and SPA the same audience lul
                new ApiResource("MyAwesome-API", "The best API ever seen")
                {
                    Scopes = new List<string>{
                        "openid", "profile", "email",
                        "myawesomeapi.full_access",
                        "myawesomeapi.app_access"
                    },

                }
            };
        }

        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new List<ApiScope>
            {
                new ApiScope( name: "read",   displayName: "Read your data."),
                new ApiScope( name: "write",  displayName: "Write your data."),
                new ApiScope( name: "delete", displayName: "Delete your data."),
                new ApiScope( name: "openid", displayName: "openid protocol information" ),
                new ApiScope( name: "profile", displayName: "Profile information" ),
                new ApiScope( name: "email", displayName: "Email information" ),
                new ApiScope( name: "myawesomeapi.full_access", displayName: "Full Access" ),
                new ApiScope( name: "myawesomeapi.app_access", displayName: "App access" ),
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "MyAwesome-API",// TODO: resolve SPA not being allowed to access due to audience problem. Hacky fix to have api and SPA the same audience lul
                    ClientName = "Single Page Application client",
                    AllowAccessTokensViaBrowser = true, // TODO: how does pkce impact this
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    RequireClientSecret = false,
                    RequireConsent = false, // enables silent renew
                    RedirectUris = {
                        "https://localhost:3000/",
                    },
                    PostLogoutRedirectUris = {
                        "https://localhost:3000/#/logged-out",
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