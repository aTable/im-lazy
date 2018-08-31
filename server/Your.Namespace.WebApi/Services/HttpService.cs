using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Your.Namespace.WebApi.Services
{
    public class HttpService : IHttpService
    {
        private static HttpClient _httpClient { get; } = new HttpClient();

        public HttpService()
        {
        }

        public HttpClient HttpClient { get { return _httpClient; } }
    }

    public interface IHttpService
    {
        HttpClient HttpClient { get; }
    }
}