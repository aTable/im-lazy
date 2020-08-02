using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using GraphQL.Authorization;
using GraphQL.Types;

namespace Your.Namespace.Api
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetClaimValue(this ClaimsPrincipal claimsPrincipal, string claimType)
        {
            return claimsPrincipal.Claims.Single(c => c.Type == claimType).Value;
        }
    }
    public static class GraphQLExtensions
    {
        public static string GetUserId(this ResolveFieldContext<object> context)
        {
            return ((GraphQLUserContext)context.UserContext).User.GetClaimValue(ClaimTypes.NameIdentifier);
        }
    }
    public class GraphQLUserContext : Dictionary<string, object>, IProvideClaimsPrincipal
    {
        public ClaimsPrincipal User { get; set; }
    }
}