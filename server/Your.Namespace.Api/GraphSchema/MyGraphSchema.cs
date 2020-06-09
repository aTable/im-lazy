using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Conversion;
using GraphQL.Types;

namespace Your.Namespace.Api.GraphSchema
{
    public class MyGraphSchema : Schema
    {
        public MyGraphSchema(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<MyGraphQuery>();
            //Mutation = resolver.Resolve<MyGraphMutation>();
        }
    }
}