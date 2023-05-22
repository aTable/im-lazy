using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using System.Reflection;
using Your.Namespace.Api.DataAccess;

namespace Your.Namespace.Api.Extensions
{
    public class UseApplicationDbContextAttribute : ObjectFieldDescriptorAttribute
    {
        public override void OnConfigure(
            IDescriptorContext context,
            IObjectFieldDescriptor descriptor,
            MemberInfo member)
        {
            descriptor.UseDbContext<ApplicationDbContext>();
        }
    }
}
