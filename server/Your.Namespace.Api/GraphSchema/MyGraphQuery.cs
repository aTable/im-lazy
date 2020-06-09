using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;

namespace Your.Namespace.Api.GraphSchema
{
    public class MyGraphQuery : ObjectGraphType
    {
        public MyGraphQuery()
        {
            Field<ListGraphType<StoreType>>(name: "stores", resolve: ctx => MyGraphData.Stores.ToList());
            Field<ListGraphType<ProductType>>(name: "products", resolve: ctx => MyGraphData.Stores.SelectMany(x => x.Products));
        }
    }
}