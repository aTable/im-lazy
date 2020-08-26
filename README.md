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

- [ ] convert Implicit grant to PKCE due to being vulnerable to [interception attacks](https://tools.ietf.org/html/rfc7636)
- [ ] upgrade IdentityServer to be https:// (resolve cross platform cert situation)
- [ ] consider replacing `axios`. The repo is still alive [kinda](https://github.com/axios/axios/issues/1965)
- [ ] add `terraform` per deployable project
- [ ] add `Docker` per deployable project
- [ ] convert `docker-compose.yml` to `Kubernetes`
- [ ] add `garden`/`tilt`/`skaffold` for k8s local dev environments.

## Development setup

Code-OSS on Arch doesn't seem to execute the .vscode/launch.json file which is quite problematic for local development. // TODO: figure out

Install cross-platform .NET Core debugger

```
curl -sSL https://aka.ms/getvsdbgsh | /bin/sh /dev/stdin -v latest -l ~/.vsdbg
```

Install the tools via:

```shell
pacman -S dotnet-sdk aspnet-runtime
```

Generate your self-signed certificate for https in development:

```
dotnet dev-certs https -ep $HOME/.aspnet/https/yournamespace.pfx -p password -v
```

When running the web client without trusting certificates, you may need to visit each web server individually in your browser and accept the risks for temporary access.

## Developing 

Update `NuGet` packages

```bash
find . -type f -name "*.csproj" -exec bash -c 'cd $(dirname $0) && dotnet list package --outdated | sed -n -E "s/^.*> (\S*) .*([0-9].[0-9].[0-9]) $/dotnet add package \1 --version \2/gmip" | sh' {} \;
```

Update `npm` packages

```bash
npx npm-check-updates -u
```