using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Your.Namespace.Api.Controllers
{
    //[ApiController]
    [Route("")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return $@"<html>
                <p>You probably want to go to:</p>
                <ul>
                    <li>/graphiql</li>
                    <li>/ui/playground</li>
                    <li>/weatherforecast</li>
                    <li>/protectedvalues</li>
                </ul>

                <p>Note this is just a raw string (and not a Razor page) as this API is intending to be consumed by a SPA.
            </html>";
        }
    }
}
