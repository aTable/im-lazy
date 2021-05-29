using System;

namespace Your.Namespace.Api
{
    public class AppSettings
    {
        public static Uri YourNamespaceApi2BaseUri
        {
            get
            {
                var host = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI2_SERVICE_SERVICE_HOST");
                var port = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI2_SERVICE_SERVICE_PORT");
                return new Uri($"http://{host}:{port}");
            }
        }

        public static Uri YourNamespaceApi3BaseUri
        {
            get
            {
                var host = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI3_SERVICE_SERVICE_HOST");
                var port = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI3_SERVICE_SERVICE_PORT");
                return new Uri($"http://{host}:{port}");
            }
        }

        public static Uri YourNamespaceApi4BaseUri
        {
            get
            {
                var host = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI4_SERVICE_SERVICE_HOST");
                var port = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI4_SERVICE_SERVICE_PORT");
                return new Uri($"http://{host}:{port}");
            }
        }

        public string ApiName { get; set; }
        public string CorsPolicyName { get; set; }
        public string WebClientOrigin { get; set; }
        public string AuthorizationServerUri { get; set; }
        public bool AuthorizationServerRequiresHttps { get; set; }
        public int MaxPageSize { get; set; }
        public bool IsRunMigrations { get; set; }
        public bool IsRunSeed { get; set; }
        public GraphSettings GraphSettings { get; set; }

    }

    public class GraphSettings
    {
        public string Path { get; set; }
        public string PlaygroundPath { get; set; }

    }
}