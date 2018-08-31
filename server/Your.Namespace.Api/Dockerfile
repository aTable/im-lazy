FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
ENV ASPNETCORE_URLS="http://+:9080;https://+:9081"
ENV ASPNETCORE_HTTPS_PORT=9081
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="password"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/https/yournamespaceapi.pfx
VOLUME /https
EXPOSE 9080 9081
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY Your.Namespace.Api.csproj .
RUN dotnet restore Your.Namespace.Api.csproj
COPY . .
RUN dotnet build Your.Namespace.Api.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish Your.Namespace.Api.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Your.Namespace.Api.dll"]
