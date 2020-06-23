using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Your.Namespace.IdentityServer
{
    public class AppSettings
    {
        public string WebClientOrigin { get; set; }
        public bool IsRunMigrations { get; set; }
        public bool IsRunSeed { get; set; }
        public AzureOIDC AzureOIDC { get; set; }
        public AzureKeyVault AzureKeyVault { get; set; }
    }

    public class AzureKeyVault
    {
        public string CertName { get; set; }
        public Uri Uri { get; set; }
    }

    public class AzureOIDC
    {
        public string Authority { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }
}