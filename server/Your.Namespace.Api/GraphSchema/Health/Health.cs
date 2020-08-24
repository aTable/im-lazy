using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Language;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Your.Namespace.Api.DataAccess;

namespace Your.Namespace.Api.GraphSchema.Health
{
    public class Health
    {
        public string ApiStatus { get; set; }
        [Authorize]
        public string DatabaseStatus { get; set; }
    }
}
