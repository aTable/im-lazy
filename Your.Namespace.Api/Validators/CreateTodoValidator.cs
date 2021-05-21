using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Your.Namespace.Api.DataAccess;
using Your.Namespace.Api.Models;
using Your.Namespace.Api.ViewModels;

namespace Your.Namespace.Api.Validators
{
    public class CreateTodoValidator : AbstractValidator<CreateTodoViewModel>
    {
        public CreateTodoValidator(ILogger<CreateTodoValidator> logger)
        {
            logger.LogDebug("just did some validation");
            RuleFor(x => x.Id).Empty();
            RuleFor(x => x.Label).NotEmpty();
        }

    }
}
