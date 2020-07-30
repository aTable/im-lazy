# Identity Server

## Provisioning

By default, the seed is always run in development. You can change this by updating `appsettings.{ASPNETCORE_ENVIRONMENT}.json` with `App:IsRunSeed` to `false`

Ensure you have the EF tools installed

```bash
dotnet tool install --global dotnet-ef
```

If on linux, you may need to

```
export PATH=$PATH:/path/to/your/home/.dotnet/tools
```

Create the migrations
```
dotnet ef migrations add init --context Your.Namespace.IdentityServer.DataAccess.Context
dotnet ef migrations add init --context IdentityServer4.EntityFramework.DbContexts.PersistedGrantDbContext
dotnet ef migrations add init --context IdentityServer4.EntityFramework.DbContexts.ConfigurationDbContext
```

### Script migrations

Note `--idempotent` is not supported by SQLite.

```bash
dotnet ef migrations script -v --output "identity-server-App-migrations.sql" --context Your.Namespace.IdentityServer.DataAccess.Context --configuration Debug

dotnet ef migrations script -v --output "identity-server-PersistedGrant-migrations.sql" --context IdentityServer4.EntityFramework.DbContexts.PersistedGrantDbContext --configuration Debug

dotnet ef migrations script -v --output "identity-server-Configuration-migrations.sql" --context IdentityServer4.EntityFramework.DbContexts.ConfigurationDbContext --configuration Debug
```

### Apply migrations

```bash
dotnet ef database update --context Your.Namespace.IdentityServer.DataAccess.Context

dotnet ef database update --context IdentityServer4.EntityFramework.DbContexts.PersistedGrantDbContext

dotnet ef database update --context IdentityServer4.EntityFramework.DbContexts.ConfigurationDbContext
```

## Running

Remember to apply the seed (on by default). You may want to turn this off in production.

```
dotnet run -p Your.Namespace.IdentityServer
```
