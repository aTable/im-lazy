using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Your.Namespace.Api
{
    public class AppSettings
    {
        public string ApiName { get; set; }
        public string CorsPolicyName { get; set; }
        public string WebClientOrigin { get; set; }
        public string AuthorizationServerUri { get; set; }
        public bool AuthorizationServerRequiresHttps { get; set; }
        public int MaxPageSize { get; set; }
        public bool IsRunMigrations { get; set; }
        public bool IsRunSeed { get; set; }
    }
}