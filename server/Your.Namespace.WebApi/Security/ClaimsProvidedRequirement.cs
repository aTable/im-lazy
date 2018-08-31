using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Your.Namespace.WebApi.Security
{
    public class ClaimProvidedRequirement : IAuthorizationRequirement
    {
        public Claim[] RequiredClaims { get; private set; }

        public ClaimProvidedRequirement(Claim[] requiredClaims)
        {
            RequiredClaims = requiredClaims;
        }
    }
}