using System;

namespace Your.Namespace.Api
{
    public class AppSettings
    {
        public static Uri YourNamespaceApi2BaseUri
        {
            get
            {
                var host = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI2_SVC_SERVICE_HOST");
                var port = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI2_SVC_SERVICE_PORT");
                if (Uri.TryCreate($"http://{host}:{port}", UriKind.Absolute, out Uri result))
                    return result;
                else
                    return null;
            }
        }

        public static Uri YourNamespaceApi3BaseUri
        {
            get
            {
                var host = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI3_SVC_SERVICE_HOST");
                var port = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI3_SVC_SERVICE_PORT");
                if (Uri.TryCreate($"http://{host}:{port}", UriKind.Absolute, out Uri result))
                    return result;
                else
                    return null;
            }
        }

        public static Uri YourNamespaceApi4BaseUri
        {
            get
            {
                var host = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI4_SVC_SERVICE_HOST");
                var port = Environment.GetEnvironmentVariable("YOURNAMESPACEAPI4_SVC_SERVICE_PORT");
                if (Uri.TryCreate($"http://{host}:{port}", UriKind.Absolute, out Uri result))
                    return result;
                else
                    return null;
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
        public JaegerSettings JaegerSettings { get; set; }


    }

    public class GraphSettings
    {
        public string Path { get; set; }
        public string PlaygroundPath { get; set; }
    }

    public class JaegerSettings
    {
        public string JaegerServiceName { get; set; }
        public string JaegerAgentHost { get; set; }
        public int JaegerAgentPort { get; set; }

    }
}