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

namespace Your.Namespace.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class TestController : ControllerBase
    {
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

        [HttpGet("two")]
        public async Task<ActionResult<string>> GetTwo()
        {
            var res = await HttpClient.GetStringAsync(AppSettings.YourNamespaceApi2BaseUri);
            return res;
        }

        [HttpGet("three")]
        public async Task<ActionResult<string>> GetThree()
        {
            var res = await HttpClient.GetStringAsync(AppSettings.YourNamespaceApi3BaseUri);
            return res;
        }

        [HttpGet("four")]
        public async Task<ActionResult<string>> GetFour()
        {
            var res = await HttpClient.GetStringAsync(AppSettings.YourNamespaceApi4BaseUri);
            return res;
        }

    }
}
