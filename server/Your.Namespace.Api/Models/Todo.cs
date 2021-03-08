using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Your.Namespace.Api.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string Label { get; set; }
        public bool IsDone { get; set; }
        public string[] Assignees { get; set; }
    }
}
