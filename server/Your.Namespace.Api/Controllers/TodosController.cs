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

namespace Your.Namespace.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly ILogger<TodosController> _logger;
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

        public TodosController(ILogger<TodosController> logger)
        {
            _logger = logger;
        }

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
        public ActionResult<dynamic> GetAssignees(int id)
        {
            var todo = _todos.FirstOrDefault(x => x.Id == id);
            if (todo == null)
                return NotFound();

            return todo.Assignees;
        }
    }
}
