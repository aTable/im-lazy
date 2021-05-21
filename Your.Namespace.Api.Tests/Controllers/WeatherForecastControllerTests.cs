using System;
using Xunit;
using Moq;
using Your.Namespace.Api.Controllers;
using Microsoft.Extensions.Logging;
using System.Linq;

namespace Your.Namespace.Api.Tests.Controllers
{
    public class WeatherForecastControllerTests
    {
        [Fact]
        public void GetWeatherTest()
        {
            // arrange 
            var logger = new Mock<ILogger<WeatherForecastController>>();
            var controller = new WeatherForecastController(logger.Object);

            // act
            var result = controller.Get();

            // assert
            Assert.True(result.Count() == 5);
        }
    }
}