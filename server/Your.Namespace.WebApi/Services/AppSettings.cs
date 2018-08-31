using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Your.Namespace.WebApi.Services
{
    public class AppSettings
    {
        public string Name { get; set; }
        public NestedSettings Nested { get; set; }
    }

    public class NestedSettings
    {
        public int NestedValue { get; set; }
    }
}