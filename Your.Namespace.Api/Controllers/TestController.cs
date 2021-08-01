using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Your.Namespace.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.Routing;
using Your.Namespace.Api.ViewModels;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using OpenTelemetry.Context.Propagation;
using System.Diagnostics;
using OpenTelemetry;

namespace Your.Namespace.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class TestController : ControllerBase
    {
        private static readonly ActivitySource Activity = new(nameof(TestController));
        private static readonly TextMapPropagator Propagator = Propagators.DefaultTextMapPropagator;

        private readonly ILogger<TestController> _logger;

        public TestController(
            ILogger<TestController> logger,
            AppSettings appSettings,
            HttpClient httpClient
        )
        {
            _logger = logger;
            AppSettings = appSettings;
            HttpClient = httpClient;
        }

        public AppSettings AppSettings { get; }
        public HttpClient HttpClient { get; }

        [HttpGet("one")]
        public async Task<ActionResult<string>> GetOne()
        {
            var uri = new Uri(AppSettings.YourNamespaceApi2BaseUri + "/one");
            var res = await HttpClient.GetStringAsync(uri);
            return res;
        }

        [HttpGet("two")]
        public async Task<ActionResult<string>> GetTwo()
        {
            var uri = new Uri(AppSettings.YourNamespaceApi2BaseUri + "/two");
            var res = await HttpClient.GetStringAsync(uri);
            return res;
        }

        [HttpGet("three")]
        public async Task<ActionResult<string>> GetThree()
        {
            var uri = new Uri(AppSettings.YourNamespaceApi2BaseUri + "/three");
            var res = await HttpClient.GetStringAsync(uri);
            return res;
        }

        [HttpGet("echo")]
        public async Task<ActionResult<string>> Echo(string message)
        {
            var parentContext = Propagator.Extract(default, Request.Headers, (headers, key) => headers[key]);
            Baggage.Current = parentContext.Baggage;
            using var activity = Activity.StartActivity("Process Message by echo", ActivityKind.Consumer, parentContext.ActivityContext);
            activity?.SetTag("processing.system", "text");
            activity?.SetTag("processing.metadata", "text");
            _logger.LogInformation("Message Received: " + message);
            return message;
        }

    }
}
