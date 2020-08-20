using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Your.Namespace.Api;

namespace Your.Namespace.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProtectedValuesController : ControllerBase
    {
        public ILogger Logger { get; }
        public AppSettings AppSettings { get; }

        public ProtectedValuesController(ILogger logger, AppSettings appSettings)
        {
            Logger = logger;
            AppSettings = appSettings;
        }

        // GET api/values
        [HttpGet]
        [Authorize(Policy = Policies.User)]
        public ActionResult<IEnumerable<string>> Get()
        {
            Logger.Information("protected values were requested");
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}