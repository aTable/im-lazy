
namespace Your.Namespace.Api.Models
{
    public enum PrometheusAlertStatus
    {
        Unknown,
        Resolved,
        Firing
    }
    public class PrometheusAlert
    {
        public string Version { get; set; }
        public string GroupKey { get; set; }
        public int TruncatedAlerts { get; set; }
        public PrometheusAlertStatus Status { get; set; }
        public string Receiver { get; set; }
        public dynamic GroupLabels { get; set; }
        public dynamic CommonLabels { get; set; }
        public dynamic CommonAnnotations { get; set; }
        public string ExternalUrl { get; set; }
        public PrometheusAlertDetails[] Alerts { get; set; }
    }

    public class PrometheusAlertDetails
    {
        public PrometheusAlertStatus Status { get; set; }
        public dynamic Labels { get; set; }
        public dynamic Annotations { get; set; }
        public dynamic StartsAt { get; set; }
        public dynamic EndsAt { get; set; }
        public string GeneratorUrl { get; set; }
    }
}

