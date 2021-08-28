using System;

namespace Your.Namespace.Api
{
    public class AppSettings
    {

        public static Uri YourNamespaceApi2BaseUri
        {
            get
            {
                if (Uri.TryCreate($"http://yournamespaceapi2-svc.default", UriKind.Absolute, out Uri result))
                    return result;
                else
                    return null;
            }
        }

        public static Uri YourNamespaceApi3BaseUri
        {
            get
            {
                if (Uri.TryCreate($"http://yournamespaceapi3-svc.default", UriKind.Absolute, out Uri result))
                    return result;
                else
                    return null;
            }
        }

        public static Uri YourNamespaceApi4BaseUri
        {
            get
            {
                if (Uri.TryCreate($"http://yournamespaceapi4-svc.default", UriKind.Absolute, out Uri result))
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