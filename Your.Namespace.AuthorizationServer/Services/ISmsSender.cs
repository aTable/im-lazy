using System.Threading.Tasks;

namespace Your.Namespace.AuthorizationServer.Services
{
    public interface ISmsSender
    {
        Task SendSmsAsync(string number, string message);
    }
}
