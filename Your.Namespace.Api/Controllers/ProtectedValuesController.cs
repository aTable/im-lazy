using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using OpenIddict.Validation.AspNetCore;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Your.Namespace.Api;

namespace Your.Namespace.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProtectedValuesController : ControllerBase
    {
        public ILogger<ProtectedValuesController> Logger { get; }
        public AppSettings AppSettings { get; }

        public ProtectedValuesController(ILogger<ProtectedValuesController> logger, AppSettings appSettings)
        {
            Logger = logger;
            AppSettings = appSettings;
        }

        // GET api/values
        [HttpGet]
        //[Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        [Authorize(Policy = Policies.User)]
        public ActionResult<IEnumerable<string>> Get()
        {
            Logger.LogInformation("protected values were requested");
            var identity = User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return BadRequest();
            }

            //return Content($"You have authorized access to resources belonging to {identity.Name} on Zirku.Api1.");

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