using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
        public PagedMetadata Metadata { get; set; }
        public T[] Records { get; set; }
    }

    public class PagedMetadata
    {
        public int Total { get; set; }
        public int PageSize { get; set; }
        public int PageNumber { get; set; }
        public int PageCount { get; set; }
    }
}
