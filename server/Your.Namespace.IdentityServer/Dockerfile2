FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
ENV ASPNETCORE_URLS="http://+:9082;https://+:9083"
ENV ASPNETCORE_HTTPS_PORT=9083
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="password"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/https/yournamespaceidentityserver.pfx
VOLUME /https
EXPOSE 9082 9083
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY Your.Namespace.IdentityServer.csproj .
RUN dotnet restore Your.Namespace.IdentityServer.csproj
COPY . .
RUN dotnet build Your.Namespace.IdentityServer.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Your.Namespace.IdentityServer.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Your.Namespace.IdentityServer.dll"]
