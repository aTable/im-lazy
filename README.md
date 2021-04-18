# im-lazy

A template repository for building React single page apps talking to .NET Core back ends. Clone, `rm rf ./git`, grab a drink and pretend you've spent ages configuring things. The intent is to be opinionated in the technology choices so that all the wiring and plumbing is set up allowing you to focus on bringing your idea to life, securely. The opinion of wanting to write minimal code to add value.

## Motivation

To deliver value, not code.

- GraphQL -> add value, not endpoints
- React -> add value, not ##insert_edgy_comment##

## Choices

### Infrastructure

| Tech      | Purpose                                                                                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| terraform | [Infrastructure as Code](https://docs.microsoft.com/en-us/azure/devops/learn/what-is-infrastructure-as-code) to provision resources automatically and version changes |
| docker    | containerization                                                                                                                                                      |

### Back end

| Tech                                                                                                         | Purpose                                                                                                           |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/introduction-to-aspnet-core?view=aspnetcore-3.1) | C# is a wonderful language and the .NET ecosystem is only getting more open and cross-platform.                   |
| [Identity Server](https://identityserver4.readthedocs.io/en/latest/)                                         | An OAuth 2.0 "microservice" that supports all grant types and multiple forms of authentication and authorization. |

### Front end

| Tech                                        | Purpose                 |
| ------------------------------------------- | ----------------------- |
| [React](https://reactjs.org/) (and friends) | component driven design |
| a crapton of libraries                      | write less, do more     |

Building will also auto-generate front end documentation.

## Future

- [ ] upgrade IdentityServer to be https:// (resolve cross platform cert situation)
- [ ] consider replacing `axios`. The repo is still alive [kinda](https://github.com/axios/axios/issues/1965)
- [ ] add `terraform` per deployable project
- [ ] add `Docker` per deployable project
- [ ] convert `docker-compose.yml` to `Kubernetes`
- [ ] add `garden`/`tilt`/`skaffold` for k8s local dev environments.

## Development setup

This repository has been setup for an `F5` experience to lower the barrier to entry in aim to be more productive. As a result, there are some things that should be attended to if you were to commit to this boilerplate. For example: 

- leveraging [user secrets](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=linux) in .NET instead of `appsettings.json` containing connection strings and secrets



## Development helpers

Update `NuGet` packages

```bash
find . -type f -name "*.csproj" -exec bash -c 'cd $(dirname $0) && dotnet list package --outdated | sed -n -E "s/^.*> (\S*) .*([0-9].[0-9].[0-9]) $/dotnet add package \1 --version \2/gmip" | sh' {} \;
```

Update `npm` packages

```bash
npx npm-check-updates -u
```

Launch k8s

```bash
eval $(minikube -p minikube docker-env)

find -type f -name "*.yaml" -exec kubectl apply -f {} \;

find -type f -name "*.yaml" | sed 's/.\///' | sed 's/$/,/' | xargs


docker run --rm -p 9082:9082 -p 9083:9083 -v ~/.aspnet/https:/https -e "ASPNETCORE_URLS=https://+;http://+" -e "ASPNETCORE_HTTPS_PORT=9083" -e "ASPNETCORE_ENVIRONMENT=development" -e "ASPNETCORE_Kestrel__Certificates__Default__Password=password" -e "ASPNETCORE_Kestrel__Certificates__Default__Path=/https/yourentirenamespace.pfx"  yournamespaceidentityserver:latest
```

## Load testing

Rust's [drill](https://github.com/fcsonline/drill) is a simple and declarative way to execute load testing. 

```sh
drill --benchmark ./load-testing/load-test.yml --stats
```

Example `load-test.yml` contents:
```yml
---
concurrency: 50
base: 'http://localhost:9080'
iterations: 100
rampup: 5

plan:
  - name: Fetch todos
    request:
      url: /api/todos
  - name: Fetch weather
    request:
      url: /weatherforecast
  
```

## Show and tell

Here's a list of things to call out in this repository.

### Monitoring

Dashboards are setup to monitor

- [Host nodes](http://localhost:3000/d/node-exporter-dashboard/node-exporter-for-prometheus-dashboard-en-v20201010?orgId=1)
- [Containers](http://localhost:3000/d/cadvisor-dashboard/docker-and-system-monitoring?orgId=1&refresh=5m)
- [Your application dashboard](http://localhost:3000/d/mfyFMAuGk/yournamespaceapi-dashboard?orgId=1&refresh=5s)

Default username and password is `admin`. 

These dashboards are found `~/server/grafana/provisioning/dashboards`



### Alerting

Alert rules are defined in `~/server/prometheus/alert.rules` and are actioned by `~/server/alertmanager/alertmanager/config.yml` which are:

| Receiver | Location | 
| -------| -------| 
| Webhook | `~/server/Your.Namespace.Api/Controllers/AlertsController.cs` |
| Email | `~/server/mailserver/maildata/example.org/operations-team/new` |

### Documentation

Authoring documents located `~/documentation` assumes writing in markdown and uses

- [Pandoc](https://pandoc.org)
- [PlantUML](https://plantuml.com/)

to generate human friendly versions by running `~/documentation/build.sh` outputting to `~/documentation/dist` 