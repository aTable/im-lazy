# im-lazy

A template repository for building React single page apps talking to .NET Core back ends. Clone, `rm rf ./git`, grab a drink and pretend you've spent ages configuring things. The intent is to be opinionated in the technology choices so that all the wiring and plumbing is set up allowing you to focus on bringing your idea to life, securely. The opinion of wanting to write minimal code to add value.

## Motivation

To deliver value, not code.

- GraphQL -> add value, not endpoints
- React -> add value, not ##insert_edgy_comment##

## Development setup

Run this snippet if you use Minikube until https://github.com/kubernetes/minikube/issues/11513 is resolved.

A recent change in the linux kernel has required virtualization tools to update (Kind has resolved this in v0.11).

```bash
sudo sysctl net/netfilter/nf_conntrack_max=131072
```

and now normal minikube init

```bash
minikube start --addons=ingress
```

You may also experience [DNS service resolution issues and consider modifying](https://github.com/coredns/coredns/issues/2087)

```bash
kubectl -n kube-system edit configmap coredns
```

to add `log` and remove `loop` indicated by the `++` and `--`

```bash
data:
  Corefile: |
    .:53 {
        errors
        ++log
        health {
           lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
           ttl 30
        }
        prometheus :9153
        hosts {
           192.168.49.1 host.minikube.internal
           fallthrough
        }
        forward . /etc/resolv.conf {
           max_concurrent 1000
        }
        --loop
        cache 30
        reload
        loadbalance
    }
kind: ConfigMap
...
```

See `provision.sh` for full configuration. You'll probably also want

```bash
minikube dashboard
minikube tunnel
```

This repository has tried to stay simple for an `F5` experience to lower the barrier to entry in aim to be more productive. For setup, there are still things to configure:

Update your local device hosts file

```bash
sudo vim /etc/hosts
```

to include the IP address to your minikube cluster

```
...
192.168.49.2 yournamespacecluster.local
...
```

RabbitMQ is required by the application servers. If you run the application by `skaffold dev` then `local-development-backend.yml` is already configured but if you want to launch the app outside of the k8s cluster, maybe via VS Code F5 debugging, you will want to expose the rabbit amqp access:

```bash
kubectl port-forward service/rabbit-simple-cluster 5672:5672
```

prior to launching the application server

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

### rabbitmq

admin ui credentials, you will need to change `hello-world` to your rabbit cluster name

username

```bash
k -n default get secret hello-world-default-user -o jsonpath='{.data.username}' | base64 --decode
```

admin ui password

```bash
k -n default get secret hello-world-default-user -o jsonpath='{.data.password}' | base64 --decode
```
