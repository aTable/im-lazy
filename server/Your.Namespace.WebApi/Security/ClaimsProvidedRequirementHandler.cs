using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Your.Namespace.WebApi.Security
{
    public class ClaimsProvidedRequirementHandler : AuthorizationHandler<ClaimProvidedRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ClaimProvidedRequirement requirement)
        {
            foreach (var requiredClaim in requirement.RequiredClaims)
            {
                if (context.User.HasClaim(requiredClaim.Type, requiredClaim.Value))
                {
                    context.Succeed(requirement);
                    return Task.CompletedTask;
                }
            }
            context.Fail();
            return Task.CompletedTask;
        }
    }
}