using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Your.Namespace.Api.Models
{
    public class Paged<T> where T : class
    {
        public Paged(int pageSize, int pageNumber, int total, T[] records)
        {
            Metadata = new PagedMetadata
            {
                Total = total,
                PageSize = pageSize,
                PageNumber = pageNumber,
                PageCount = (int)Math.Ceiling((decimal)total / pageSize)
            };
            Records = records;
        }

        public Paged(int pageSize, int pageNumber, int total, T[] records, HttpRequest request) : this(pageSize, pageNumber, total, records)
        {
            var baseUri = new Uri(request.Scheme + "://" + request.Host + request.Path.Value);
            if (request.Path.HasValue && Metadata.HasPrevious)
            {
                var uriBuilder = new UriBuilder(baseUri);
                var query = HttpUtility.ParseQueryString(request.QueryString.Value);
                query["pageNumber"] = (pageNumber - 1).ToString();
                uriBuilder.Query = query.ToString();
                Metadata.Previous = uriBuilder.Uri;
            }

            if (request.Path.HasValue && Metadata.HasNext)
            {
                var uriBuilder = new UriBuilder(baseUri);
                var query = HttpUtility.ParseQueryString(request.QueryString.Value);
                query["pageNumber"] = (pageNumber + 1).ToString();
                uriBuilder.Query = query.ToString();
                Metadata.Next = uriBuilder.Uri;
            }
        }
        public PagedMetadata Metadata { get; set; }
        public T[] Records { get; set; }
    }

    public class PagedMetadata
    {
        public int Total { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public int PageCount { get; set; }
        public bool HasPrevious => PageNumber > 1;
        public bool HasNext => PageNumber < PageCount;
        public Uri Previous { get; set; }
        public Uri Next { get; set; }
    }
}
