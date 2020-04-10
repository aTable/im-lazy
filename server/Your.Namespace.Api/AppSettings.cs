using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Your.Namespace.Api
{
  public class AppSettings
  {
    public string CorsPolicyName { get; set; }
    public string WebClientOrigin { get; set; }
    public string AuthorizationServerUri { get; set; }
  }
}