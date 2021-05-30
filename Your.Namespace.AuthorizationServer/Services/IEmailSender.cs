using System.Threading.Tasks;

namespace Your.Namespace.AuthorizationServer.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}
