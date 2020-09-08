FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 9080
EXPOSE 9081

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build

WORKDIR /src
COPY ["Your.Namespace.Api/Your.Namespace.Api.csproj", "Your.Namespace.Api/"]
RUN dotnet restore "Your.Namespace.Api/Your.Namespace.Api.csproj"
COPY . .
WORKDIR "/src/Your.Namespace.Api"
RUN dotnet build "Your.Namespace.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Your.Namespace.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Your.Namespace.Api.dll"]
