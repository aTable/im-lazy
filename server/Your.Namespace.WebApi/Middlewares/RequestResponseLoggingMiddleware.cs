using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Http.Internal;
using Serilog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Your.Namespace.WebApi.Middlewares
{
    public class RequestResponseLoggingMiddleware
    {
        public RequestResponseLoggingMiddleware(RequestDelegate next, ILogger logger)
        {
            Next = next;
            Logger = logger;
        }

        public RequestDelegate Next { get; }
        public ILogger Logger { get; }

        public async Task Invoke(HttpContext context)
        {
            Logger.Debug(await FormatRequest(context.Request));

            var bodyStream = context.Response.Body;
            using (var ms = new MemoryStream())
            {
                context.Response.Body = ms;
                await Next(context);
                Logger.Debug(await FormatResponse(context.Response));
                await ms.CopyToAsync(bodyStream);
            }
        }

        private async Task<string> FormatRequest(HttpRequest request)
        {
            request.EnableRewind();
            var body = request.Body;

            var buffer = new byte[Convert.ToInt32(request.ContentLength)];
            await request.Body.ReadAsync(buffer, 0, buffer.Length);
            var bodyAsText = Encoding.UTF8.GetString(buffer);
            body.Seek(0, SeekOrigin.Begin);
            request.Body = body;

            var headers = new StringBuilder();
            foreach (var header in request.Headers)
            {
                headers.AppendLine($"{header.Key}:{header.Value}");
            }

            return $@"REQ {request.Method} {request.GetDisplayUrl()}
{headers.ToString()}
{bodyAsText}";
        }

        private async Task<string> FormatResponse(HttpResponse response)
        {
            response.Body.Seek(0, SeekOrigin.Begin);
            var content = await new StreamReader(response.Body).ReadToEndAsync();
            response.Body.Seek(0, SeekOrigin.Begin);

            var output = $@"RES {response.StatusCode} {response.HttpContext.Request.GetDisplayUrl()}
{content}";
            return output;
        }
    }
}