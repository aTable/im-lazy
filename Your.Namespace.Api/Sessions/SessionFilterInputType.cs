using HotChocolate.Data.Filters;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Sessions
{
    public class SessionFilterInputType : FilterInputType<Session>
    {
        protected override void Configure(IFilterInputTypeDescriptor<Session> descriptor)
        {
            descriptor.Ignore(t => t.Id);
            descriptor.Ignore(t => t.TrackId);
        }
    }
}
