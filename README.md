# im-lazy

A template repository for building React single page apps talking to .NET Core back ends. Clone, `rm rf ./git`, grab a drink and pretend you've spent ages configuring things. The intent is to be opinionated in the technology choices so that all the wiring and plumbing is set up allowing you to focus on bringing your idea to life, securely.

## Technologies

### General

| Tech      | Purpose                |
| --------- | ---------------------- |
| terraform | [Infrastructure as Code](https://docs.microsoft.com/en-us/azure/devops/learn/what-is-infrastructure-as-code) to provision resources automatically and version changes |
| docker    | containerization           |

### Front end

| Tech         | Purpose                                                               |
| ------------ | --------------------------------------------------------------------- |
| react (and friends)        | component driven design on the front end                                                           |
| react-router | routing                                                               |
| axios        | HTTP fabricator |
| date-fns     | Moment excessively large and functional programming is the future                                                     |

Building will also auto-generate front end documentation.

### Back end

| Tech         | Purpose         |
| ------------ | --------------- |
| ASP.NET Core | Back end server |

## Future

- [ ] convert Implicit grant to PKCE
- [ ] upgrade IdentityServer to be https:// (resolve cross platform cert situation)
- [ ] consider replacing `axios`. The repo is on the still alive [kinda](https://github.com/axios/axios/issues/1965)
- [ ] add `terraform` per deployable project
- [ ] add `Docker` per deployable project
- [ ] convert `docker-compose.yml` to `Kubernetes`
- [ ] add `garden`/`tilt`/`skaffold` for k8s local dev environments.
