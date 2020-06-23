FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 9082
EXPOSE 9083

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["Your.Namespace.IdentityServer/Your.Namespace.IdentityServer.csproj", "Your.Namespace.IdentityServer/"]
RUN dotnet restore "Your.Namespace.IdentityServer/Your.Namespace.IdentityServer.csproj"
COPY . .
WORKDIR "/src/Your.Namespace.IdentityServer"
RUN dotnet build "Your.Namespace.IdentityServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Your.Namespace.IdentityServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Your.Namespace.IdentityServer.dll"]
