using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Your.Namespace.Api;

namespace Your.Namespace.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProtectedValuesController : ControllerBase
    {
        public AppSettings AppSettings { get; }

        public ProtectedValuesController(AppSettings appSettings)
        {
            AppSettings = appSettings;
        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [Authorize(Policy = "CanReadPolicy")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        [Authorize(Policy = "CanWritePolicy")]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        [Authorize(Policy = "CanWritePolicy")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "CanWritePolicy")]
        public void Delete(int id)
        {
        }
    }
}