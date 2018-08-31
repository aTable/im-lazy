# Identity Server

## Provisioning

By default, the seed is always run in development. You can change this by updating `appsettings.{ASPNETCORE_ENVIRONMENT}.json` with `App:IsRunSeed` to `false`

Ensure you have the EF tools installed

```bash
dotnet tool install --global dotnet-ef
```

### Script migrations

```bash
dotnet ef migrations script --idempotent -v --output "identity-server-migrations.sql" --context Your.Namespace.IdentityServer.DataAccess.Context --configuration Debug

dotnet ef migrations script --idempotent -v --output "identity-server-PersistedGrant-migrations-.sql" --context IdentityServer4.EntityFramework.DbContexts.PersistedGrantDbContext --configuration Debug

dotnet ef migrations script --idempotent -v --output "identity-server-Configuration-migrations-.sql" --context IdentityServer4.EntityFramework.DbContexts.ConfigurationDbContext --configuration Debug
```

### Apply migrations

```bash
dotnet ef database update --context Your.Namespace.IdentityServer.DataAccess.Context

dotnet ef database update --context IdentityServer4.EntityFramework.DbContexts.PersistedGrantDbContext

dotnet ef database update --context IdentityServer4.EntityFramework.DbContexts.ConfigurationDbContext
```
