# im-lazy

A template repository for building React single page apps talking to .NET Core back ends. Clone, `rm rf ./git`, grab a drink and pretend you've spent ages configuring things. The intent is to be opinionated in the technology choices so that all the wiring and plumbing is set up allowing you to focus on bringing your idea to life, securely. The opinion of wanting to write minimal code to add value.

## Motivation

To deliver value, not code.

- GraphQL -> add value, not endpoints
- React -> add value, not ##insert_edgy_comment##

## Development setup

Run this snippet if you use Minikube until https://github.com/kubernetes/minikube/issues/11513 is resolved. A recent change in the linux kernel has required virtualization tools to update (Kind has resolved this in v0.11).

```bash
sudo sysctl net/netfilter/nf_conntrack_max=131072
```

and now normal minikube init

```bash
minikube start
minikube
addons enable ingress
```

You'll probably also want

```bash
minikube dashboard
minikube tunnel

```

This repository has tried to stay simple for an `F5` experience to lower the barrier to entry in aim to be more productive.

Update your local device hosts file

```bash
sudo /etc/hosts
```

to include the IP address to your minikube cluster

```
192.168.49.2 yournamespacecluster.local
```

## Helpers..?

Install htpasswd (for bare minimal k8s security). // TODO: replace with RBAC from Keycloak/FreeIPA/OpenLDAP

```bash
apt update && apt install -y  apache2-utils
```

expose monitoring solution

```bash
k port-forward service/prometheus-operated 30000:9090
k port-forward service/prommy-kube-prometheus-sta-alertmanager 30001:9093
k port-forward service/prommy-grafana 30002:80
```

## Development helpers

Update `NuGet` packages

```bash
find . -type f -name "*.csproj" -exec bash -c 'cd $(dirname $0) && dotnet list package --outdated | sed -n -E "s/^.*> (\S*) .*([0-9].[0-9].[0-9]) $/dotnet add package \1 --version \2/gmip" | sh' {} \;
```

Update `npm` packages

```bash
npx npm-check-updates -u
```

Add migration

```bash
export YOURNAMESPACEAPI2_SERVICE_SERVICE_HOST=localhost
export YOURNAMESPACEAPI2_SERVICE_SERVICE_PORT=8002
export YOURNAMESPACEAPI3_SERVICE_SERVICE_HOST=localhost
export YOURNAMESPACEAPI3_SERVICE_SERVICE_PORT=8003
export YOURNAMESPACEAPI4_SERVICE_SERVICE_HOST=localhost
export YOURNAMESPACEAPI4_SERVICE_SERVICE_PORT=8004

dotnet ef migrations add Init --verbose
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
base: "http://localhost:9080"
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

### Documentation

Authoring documents located `~/documentation` assumes writing in markdown and uses

- [Pandoc](https://pandoc.org)
- [PlantUML](https://plantuml.com/)

to generate human friendly versions by running `~/documentation/build.sh` outputting to `~/documentation/dist`

## k8s

- grafana
  - username: `admin`
  - password: `prom-operator`
