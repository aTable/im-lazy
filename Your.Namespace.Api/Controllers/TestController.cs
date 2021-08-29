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

        [HttpGet("echo")]
        public async Task<ActionResult<string>> Echo(string message)
        {
            await Task.FromResult(true);
            var parentContext = Propagator.Extract(default, Request.Headers, (headers, key) => headers[key]);
            Baggage.Current = parentContext.Baggage;
            using var activity = Activity.StartActivity("Process Message by echo", ActivityKind.Consumer, parentContext.ActivityContext);
            activity?.SetTag("processing.system", "text");
            activity?.SetTag("processing.metadata", "text");
            _logger.LogInformation("Message Received: " + message);
            return message;
        }

        [HttpGet("two")]
        public async Task<ActionResult<string>> CallDownstreamApp2()
        {
            var parentContext = Propagator.Extract(default, Request.Headers, (headers, key) => headers[key]);
            Baggage.Current = parentContext.Baggage;
            using var activity = Activity.StartActivity("Call downstream application", ActivityKind.Consumer, parentContext.ActivityContext);
            activity?.SetTag("processing.system", "text here");
            activity?.SetTag("processing.metadata", "text goes here");
            var uri = new Uri(AppSettings.DownstreamServers.Server2 + "/two");
            var res = await HttpClient.GetStringAsync(uri);
            _logger.LogInformation($"{nameof(CallDownstreamApp2)} received: " + res);
            return res;
        }

        [HttpGet("three")]
        public async Task<ActionResult<string>> CallDownstreamApp3()
        {
            var uri = new Uri(AppSettings.DownstreamServers.Server3 + "/three");
            var res = await HttpClient.GetStringAsync(uri);
            return res;
        }

        [HttpGet("four")]
        public async Task<ActionResult<string>> CallDownstreamApp4()
        {
            var uri = new Uri(AppSettings.DownstreamServers.Server4 + "/four");
            var res = await HttpClient.GetStringAsync(uri);
            return res;
        }

        [HttpGet("start-complex-orchestration")]
        public async Task<ActionResult<string>> CallPseudoDownstreamApplication()
        {
            var parentContext = Propagator.Extract(default, Request.Headers, (headers, key) => headers[key]);
            Baggage.Current = parentContext.Baggage;
            using var activity = Activity.StartActivity("Preparing to start complex orchestration", ActivityKind.Consumer, parentContext.ActivityContext);
            activity?.SetTag("complex-orchestration", "preprocessing");
            _logger.LogInformation($"Preprocessing for complex orchestration...");
            string myHostUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}";
            var uri = new Uri(myHostUrl + "/api/test/pseudo-downstream");
            var res = await HttpClient.GetStringAsync(uri);
            _logger.LogInformation($"Complex orchestration completed...");
            return res;
        }


        [HttpGet("pseudo-downstream")]
        public async Task<ActionResult<string>> PretendDownstreamApplication()
        {
            var random = new Random();
            var parentContext = Propagator.Extract(default, Request.Headers, (headers, key) => headers[key]);
            Baggage.Current = parentContext.Baggage;
            using var activity = Activity.StartActivity("Performing orchestrated step: one", ActivityKind.Consumer, parentContext.ActivityContext);
            activity?.SetTag("complex-orchestration", "step one");
            _logger.LogInformation($"Complex execution step one starting...");
            await Task.Delay(random.Next(0, 5000));
            _logger.LogInformation($"Complex execution step one finished...");

            using var activity2 = Activity.StartActivity("Performing orchestrated step: two", ActivityKind.Consumer, parentContext.ActivityContext);
            activity2?.SetTag("complex-orchestration", "step two");
            _logger.LogInformation($"Complex execution step two starting...");
            await Task.Delay(random.Next(0, 5000));
            _logger.LogInformation($"Complex execution step two finished...");

            using var activity3 = Activity.StartActivity("Performing orchestrated step: three", ActivityKind.Consumer, parentContext.ActivityContext);
            activity3?.SetTag("complex-orchestration", "step three");
            _logger.LogInformation($"Complex execution step three starting...");
            await Task.Delay(random.Next(0, 5000));
            _logger.LogInformation($"Complex execution step three finished...");

            return "complex thing done!";
        }
    }
}
