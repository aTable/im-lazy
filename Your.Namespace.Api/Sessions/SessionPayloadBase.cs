using System.Collections.Generic;
using Your.Namespace.Api.Common;
using Your.Namespace.Api.Data;

namespace Your.Namespace.Api.Sessions
{
    public class SessionPayloadBase : Payload
    {
        protected SessionPayloadBase(Session session)
        {
            Session = session;
        }

        protected SessionPayloadBase(IReadOnlyList<UserError> errors)
            : base(errors)
        {
        }

        public Session? Session { get; }
    }
}
