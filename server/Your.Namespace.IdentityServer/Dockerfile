FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 9082
EXPOSE 9083

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
RUN apt-get update && \
    apt-get install -y unzip procps && \
    curl -sSL https://aka.ms/getvsdbgsh | /bin/sh /dev/stdin -v latest -l /vsdbg
WORKDIR /src
COPY ["server/Your.Namespace.IdentityServer/Your.Namespace.IdentityServer.csproj", "server/Your.Namespace.IdentityServer/"]
RUN dotnet restore "server/Your.Namespace.IdentityServer/Your.Namespace.IdentityServer.csproj"
COPY . .
WORKDIR "/src/server/Your.Namespace.IdentityServer"
RUN dotnet build "Your.Namespace.IdentityServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Your.Namespace.IdentityServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Your.Namespace.IdentityServer.dll"]
