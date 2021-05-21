using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Your.Namespace.Api.Models
{
    public class PagedQuery
    {
        [Required]
        [Range(1, 100)]
        public int PageNumber { get; set; } = 1;

        [Required]
        [Range(5, 1000)]
        public int PageSize { get; set; } = 10;

        public int Skip => PageSize * (PageNumber - 1);
    }
}
