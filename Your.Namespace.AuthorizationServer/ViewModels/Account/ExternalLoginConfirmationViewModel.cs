using System.ComponentModel.DataAnnotations;

namespace Your.Namespace.AuthorizationServer.ViewModels.Account
{
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
