using System;
using Xunit;
using Moq;
using Your.Namespace.Api.Controllers;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Your.Namespace.Api.Tests.Controllers
{
    public class WeatherForecastControllerTests
    {
        [Fact]
        public async Task GetWeatherTest()
        {
            // arrange 
            var logger = new Mock<ILogger<WeatherForecastController>>();
            var httpClient = new Mock<HttpClient>();
            var controller = new WeatherForecastController(logger.Object, httpClient.Object);

            // act
            var result = await controller.Get();

            // assert
            Assert.True(result.Count() == 5);
        }
    }
}