using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Your.Namespace.Api.Models;

namespace Your.Namespace.Api.Controllers
{
    // A webhook callback for Prometheus alerts. For demo purposes its just simply logging locally ..
    // https://prometheus.io/docs/alerting/latest/configuration/#webhook_config
    [Route("alerts")]
    public class AlertsController : ControllerBase
    {
        public AlertsController(ILogger<AlertsController> logger)
        {
            Logger = logger;
            if (PrometheusSerializerOptions == null)
            {
                PrometheusSerializerOptions = new JsonSerializerOptions(JsonSerializerDefaults.Web);
                PrometheusSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            }
        }
        public JsonSerializerOptions PrometheusSerializerOptions { get; set; }
        public ILogger<AlertsController> Logger { get; }

        [HttpPost("")]
        public async Task<string> Post()
        {
            // manually deserialize the payload due to automatic model binding not quite working as expected
            Request.EnableBuffering();
            Request.Body.Seek(0, SeekOrigin.Begin);
            var token = new CancellationToken(false);
            using var stream = new StreamReader(HttpContext.Request.Body);

            var body = stream.ReadToEnd();
            Logger.LogCritical(body);
            var model = JsonSerializer.Deserialize<PrometheusAlert>(body, PrometheusSerializerOptions);
            return "actioned";
        }
    }
}
