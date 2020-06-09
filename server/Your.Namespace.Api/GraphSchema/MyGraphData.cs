using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using Your.Namespace.Api.Entities;

namespace Your.Namespace.Api.GraphSchema
{
    public static class MyGraphData
    {
        public static List<StoreEntity> Stores = new List<StoreEntity>
        {
            new StoreEntity {
                 Id = 1, Address = "123 Fake St", Name = "Fake corner store", Type = "Imaginary goods", Products = new List<ProductEntity>{
                     new ProductEntity { Id = 1, Name = "Chefs special soup" },
                     new ProductEntity { Id = 2, Name = "Chefs special cookie" }
                 }

            }
        };
    }
    public class StoreType : ObjectGraphType<StoreEntity>
    {
        public StoreType()
        {
            Field(x => x.Id).Description("Store identifier");
            Field(x => x.Name).Description("Store description");
            Field<ListGraphType<ProductType>>(name: "products", description: "Store products");
        }
    }

    public class ProductType : ObjectGraphType<ProductEntity>
    {
        public ProductType()
        {
            Field(x => x.Id).Description("Product identifier");
            Field(x => x.Name).Description("Product name");
            Field(x => x.Manufacturer).Description("Product manufacturer");
        }
    }
}