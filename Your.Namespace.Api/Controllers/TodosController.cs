using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Your.Namespace.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc.Routing;
using Your.Namespace.Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
using OpenTelemetry.Context.Propagation;
using System.Diagnostics;
using OpenTelemetry;
using System.Net.Http;
using MassTransit;
using Your.Namespace.Api.Events;
using System.Threading;

namespace Your.Namespace.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class TodosController : ControllerBase
    {
        private static readonly ActivitySource Activity = new(nameof(TestController));
        private static readonly TextMapPropagator Propagator = Propagators.DefaultTextMapPropagator;

        private static List<Todo> _todos = new List<Todo> {
            new Todo { Id = 1, Label = "Shopping", IsDone = false, Assignees = new string[] { "past me", } },
            new Todo { Id = 2, Label = "Walk the dog", IsDone = true, Assignees = new string[] { "past me", } },
            new Todo { Id = 3, Label = "Say hi", IsDone = true, Assignees = new string[] { "past me", } },
            new Todo { Id = 4, Label = "Buy a Planck", IsDone = false, Assignees = new string[] { "past me", } },
            new Todo { Id = 5, Label = "Lift weights", IsDone = false, Assignees = new string[] { "past me", } },
            new Todo { Id = 6, Label = "Play guitar", IsDone = true, Assignees = new string[] { "past me", } },
            new Todo { Id = 7, Label = "Code", IsDone = true, Assignees = new string[] { "past me", } },
            new Todo { Id = 8, Label = "Im just filling space", IsDone = true, Assignees = new string[] { "past me", } },
            new Todo { Id = 9, Label = "To render a list", IsDone = false, Assignees = new string[] { "past me", } },
            new Todo { Id = 10, Label = "Prepare dinner", IsDone = false, Assignees = new string[] { "past me", } },
            new Todo { Id = 11, Label = "Sleep", IsDone = true, Assignees = new string[] { "past me", } },
        };


        public TodosController(
            ILogger<TodosController> logger,
            AppSettings appSettings,
            HttpClient httpClient,
            IPublishEndpoint publishEndpoint,
            //  ISendEndpoint sendEndpoint,
            IBus bus
            )
        {
            Logger = logger;
            AppSettings = appSettings;
            HttpClient = httpClient;
            PublishEndpoint = publishEndpoint;
            //    SendEndpoint = sendEndpoint;
            Bus = bus;
        }

        public ILogger<TodosController> Logger { get; }
        public AppSettings AppSettings { get; }
        public HttpClient HttpClient { get; }
        public IPublishEndpoint PublishEndpoint { get; }
        public ISendEndpoint SendEndpoint { get; }
        public IBus Bus { get; }

        [HttpGet]
        public ActionResult<Paged<Todo>> GetAll([FromQuery] PagedQuery pagedQuery)
        {
            var records = _todos.Skip(pagedQuery.Skip).Take(pagedQuery.PageSize).ToArray();
            return new Paged<Todo>(pagedQuery.PageSize, pagedQuery.PageNumber, _todos.Count, records, Request);
        }

        [HttpPost]
        public ActionResult<Todo> Create(CreateTodoViewModel model)
        {
            model.Id = _todos.Count + 1;
            model.Assignees = new string[] { "me", };
            _todos.Add(model);
            return CreatedAtAction(nameof(Create), model);
        }

        [HttpGet("{id}")]
        public ActionResult<Todo> Get(int id)
        {
            var todo = _todos.FirstOrDefault(x => x.Id == id);
            if (todo == null)
                return NotFound();
            return todo;
        }

        [HttpPut("{id}")]
        public ActionResult<Todo> Update(int id, Todo model)
        {
            var todo = _todos.FirstOrDefault(x => x.Id == id);
            if (todo == null)
                return NotFound();
            todo.Label = model.Label;
            todo.IsDone = model.IsDone;
            return todo;
        }

        [HttpPatch("{id}")]
        public ActionResult<Todo> Patch(int id, Todo model)
        {
            var todo = _todos.FirstOrDefault(x => x.Id == id);
            if (todo == null)
                return NotFound();
            if (todo.Label != model.Label)
                todo.Label = model.Label;
            if (todo.IsDone != model.IsDone)
                todo.IsDone = model.IsDone;
            return todo;
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var todo = _todos.FirstOrDefault(x => x.Id == id);
            if (todo == null)
                return NotFound();
            return Ok();
        }

        [HttpGet("{id}/assignees")]
        public ActionResult<string[]> GetAssignees(int id)
        {
            var todo = _todos.FirstOrDefault(x => x.Id == id);
            if (todo == null)
                return NotFound();

            return todo.Assignees;
        }

        [HttpGet("export")]
        public async Task<ActionResult<dynamic>> GetComplexOrchestratedReport(CancellationToken token)
        {
            var message = new
            {
                CorrelationId = Guid.NewGuid(),
                RequestedAtDateTimeUtc = DateTime.UtcNow,
            };
            var endPoint = await Bus.GetSendEndpoint(new Uri(AppSettings.RabbitMqSettings.TodosSagaQueue));
            await endPoint.Send<IReportRequest>(new
            {
                CustomerId = "customer-1234567890",
                ReportId = "reportId",
                RequestedAtDateTimeUtc = DateTime.Now,
            });

            // // preprocess
            // var parentContext = Propagator.Extract(default, Request.Headers, (headers, key) => headers[key]);
            // Baggage.Current = parentContext.Baggage;
            // using var activity = Activity.StartActivity("Preparing to start complex orchestration", ActivityKind.Consumer, parentContext.ActivityContext);
            // activity?.SetTag("complex-orchestration", "preprocessing");
            // Logger.LogInformation($"Preprocessing for complex orchestration...");
            // string myHostUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}";
            // var uri = new Uri(myHostUrl + "/api/test/pseudo-downstream");
            // var res = await HttpClient.GetStringAsync(uri);
            // Logger.LogInformation($"Complex orchestration completed...");
            // return res;

            // // process
            // var random = new Random();
            // //var parentContext = Propagator.Extract(default, Request.Headers, (headers, key) => headers[key]);
            // Baggage.Current = parentContext.Baggage;
            // using var activity1 = Activity.StartActivity("Performing orchestrated step 1", ActivityKind.Consumer, parentContext.ActivityContext);
            // activity1?.SetTag("complex-orchestration", "step 1");
            // Logger.LogInformation($"Complex execution step 1 starting...");
            // using var activity11 = Activity.StartActivity("Performing orchestrated step 1.1", ActivityKind.Consumer, parentContext.ActivityContext);
            // activity11?.SetTag("complex-orchestration", "step 1.1");
            // Logger.LogInformation($"Complex execution step 1.1 starting...");
            // await Task.Delay(random.Next(0, 1000));
            // Logger.LogInformation($"Complex execution step 1.1 finished...");
            // using var activity12 = Activity.StartActivity("Performing orchestrated step 1.2", ActivityKind.Consumer, parentContext.ActivityContext);
            // activity12?.SetTag("complex-orchestration", "step 1.2");
            // Logger.LogInformation($"Complex execution step 1.2 starting...");
            // await Task.Delay(random.Next(0, 1000));
            // Logger.LogInformation($"Complex execution step 1.2 finished...");
            // using var activity13 = Activity.StartActivity("Performing orchestrated step 1.3", ActivityKind.Consumer, parentContext.ActivityContext);
            // activity13?.SetTag("complex-orchestration", "step 1.3");
            // Logger.LogInformation($"Complex execution step 1.3 starting...");
            // await Task.Delay(random.Next(0, 1000));
            // Logger.LogInformation($"Complex execution step 1.3 finished...");
            // Logger.LogInformation($"Complex execution step 1 finished...");

            // using var activity2 = Activity.StartActivity("Performing orchestrated step 2", ActivityKind.Consumer, parentContext.ActivityContext);
            // activity2?.SetTag("complex-orchestration", "step 2");
            // Logger.LogInformation($"Complex execution step 2 starting...");
            // using var activity21 = Activity.StartActivity("Performing orchestrated step 2.1", ActivityKind.Consumer, parentContext.ActivityContext);
            // activity21?.SetTag("complex-orchestration", "step 2.1");
            // Logger.LogInformation($"Complex execution step 2.1 starting...");
            // await Task.Delay(random.Next(0, 2000));
            // Logger.LogInformation($"Complex execution step 2.1 finished...");
            // using var activity22 = Activity.StartActivity("Performing orchestrated step 2.2", ActivityKind.Consumer, parentContext.ActivityContext);
            // activity22?.SetTag("complex-orchestration", "step 2.2");
            // Logger.LogInformation($"Complex execution step 2.2 starting...");
            // await Task.Delay(random.Next(0, 2000));
            // Logger.LogInformation($"Complex execution step 2.2 finished...");
            // Logger.LogInformation($"Complex execution step 2 finished...");

            // using var activity3 = Activity.StartActivity("Performing orchestrated step 3", ActivityKind.Consumer, parentContext.ActivityContext);
            // activity3?.SetTag("complex-orchestration", "step 3");
            // Logger.LogInformation($"Complex execution step 3 starting...");
            // await Task.Delay(random.Next(0, 3000));
            // Logger.LogInformation($"Complex execution step 3 finished...");


            return "complex thing done! at " + DateTime.Now.ToLocalTime();
        }
    }
}
