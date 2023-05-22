using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OpenTelemetry;
using OpenTelemetry.Context.Propagation;

namespace Your.Namespace.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly ActivitySource Activity = new(nameof(WeatherForecastController));
        private static readonly TextMapPropagator Propagator = Propagators.DefaultTextMapPropagator;

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public HttpClient HttpClient { get; }

        public WeatherForecastController(
            ILogger<WeatherForecastController> logger,
            HttpClient httpClient
        )
        {
            _logger = logger;
            HttpClient = httpClient;
        }

        [HttpGet]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
            using var scope = _logger.BeginScope("{Id}", Guid.NewGuid().ToString("N"));
            using var activity = Activity.StartActivity("Acquiring forecast", ActivityKind.Producer);
            activity?.SetTag("weather-stuff.api", "dotnet core code gen template");
            activity?.SetTag("weather-stuff.purpose", "demo");

            var req = new HttpRequestMessage(HttpMethod.Get, $"{Request.Scheme}://{Request.Host.ToString()}/api/test/echo?message=hello%20world");
            if (activity != null) 
                Propagator.Inject(new PropagationContext(activity.Context, Baggage.Current), req, (props, key, value) => props.Headers.Add($"X-Telemetry-Trace-{key}", value));
            var res = await HttpClient.SendAsync(req);
            var rng = new Random();
            var forecast = Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();

            _logger.LogInformation(
                "WeatherForecasts generated {count}: {forecasts}",
                forecast.Length,
                forecast);

            return forecast;
        }

    }
}
