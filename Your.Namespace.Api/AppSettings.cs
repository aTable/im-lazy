using System;

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
        public GraphSettings GraphSettings { get; set; }
        public DownstreamServers DownstreamServers { get; set; }
        public JaegerSettings JaegerSettings { get; set; }
        public RabbitMqSettings RabbitMqSettings { get; set; }


    }

    public class GraphSettings
    {
        public string Path { get; set; }
        public string PlaygroundPath { get; set; }
    }

    public class DownstreamServers
    {
        public string Server2 { get; set; }
        public string Server3 { get; set; }
        public string Server4 { get; set; }
    }

    public class JaegerSettings
    {
        public string JaegerServiceName { get; set; }
        public string JaegerAgentHost { get; set; }
        public int JaegerAgentPort { get; set; }

    }

    public class RabbitMqSettings
    {
        public string Host { get; set; }
        public ushort Port { get; set; }
        public string VirtualHost { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string TodosSagaQueue { get; set; }
        public string RequestReportQueue { get; set; }
    }
}