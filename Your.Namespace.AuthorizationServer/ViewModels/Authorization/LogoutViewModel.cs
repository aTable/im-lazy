using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Your.Namespace.AuthorizationServer.ViewModels.Authorization
{
    public class LogoutViewModel
    {
        [BindNever]
        public string RequestId { get; set; }
    }
}
