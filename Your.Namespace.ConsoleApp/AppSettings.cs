using System;
using System.Collections.Generic;
using System.Text;

namespace Your.Namespace.ConsoleApp
{
    public class AppSettings
    {
        public int SayHelloWorldThisManyTimes { get; set; }
        public RabbitMqSettings RabbitMqSettings { get; set; }

    }

    public class RabbitMqSettings
    {
        public string Host { get; set; }
        public ushort Port { get; set; }
        public string VirtualHost { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string TodosSagaQueue { get; set; }
        public string RequestReportQueue { get; set; }
    }
}