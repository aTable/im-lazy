#minikube 
#minikube delete && minikube start --kubernetes-version=v1.20.0 --memory=6g --bootstrapper=kubeadm --extra-config=kubelet.authentication-token-webhook=true --extra-config=kubelet.authorization-mode=Webhook --extra-config=scheduler.address=0.0.0.0 --extra-config=controller-manager.address=0.0.0.0
minikube addons enable ingress #if not provided at minikube start --addons=ingress
minikube addons disable metrics-server

# helm charts
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo add hashicorp https://helm.releases.hashicorp.com
helm repo add linkerd https://helm.linkerd.io/stable
helm repo update

# helm uninstall kubepromstack -n monitoring
helm upgrade --install kubepromstack prometheus-community/kube-prometheus-stack -f helm-configs/kube-prometheus-stack.yml --create-namespace --namespace monitoring
# helm upgrade --install lokistack grafana/loki-stack -f helm-configs/loki-stack.yml --create-namespace --namespace=monitoring
helm upgrade --install loki grafana/loki -f helm-configs/loki.yml --create-namespace --namespace=monitoring
helm upgrade --install promtail grafana/promtail -f helm-configs/promtail.yml --create-namespace --namespace=monitoring
kubectl apply -f helm-patches/promtail-svc.yml
kubectl apply -f helm-patches/promtail-headless-svc.yml
helm upgrade --install -f helm-configs/vault.yml vault hashicorp/vault

# rabbitmq
kubectl apply -f "https://github.com/rabbitmq/cluster-operator/releases/latest/download/cluster-operator.yml"
kubectl create role rabbitmq:psp:unprivileged \
    --verb=use \
    --resource=podsecuritypolicy \
    --resource-name=some-pod-security-policy
kubectl create rolebinding rabbitmq-mycluster:psp:unprivileged \
    --role=rabbitmq:psp:unprivileged \
    --serviceaccount=some-namespace:mycluster-server
kubectl apply -f rabbit-configs/rabbitmq.yml
kubectl apply -f rabbit-configs/pod-disruption-budget.yml
kubectl apply --filename https://raw.githubusercontent.com/rabbitmq/cluster-operator/main/observability/prometheus/monitors/rabbitmq-servicemonitor.yml
kubectl apply --filename https://raw.githubusercontent.com/rabbitmq/cluster-operator/main/observability/prometheus/monitors/rabbitmq-cluster-operator-podmonitor.yml

# jaeger
kubectl create namespace observability
kubectl create -n observability -f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/crds/jaegertracing.io_jaegers_crd.yaml
kubectl create -n observability -f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/service_account.yaml
kubectl create -n observability -f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/role.yaml
kubectl create -n observability -f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/role_binding.yaml
kubectl create -n observability -f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/operator.yaml
kubectl create -f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/cluster_role.yaml
kubectl create -f https://raw.githubusercontent.com/jaegertracing/jaeger-operator/master/deploy/cluster_role_binding.yaml


# ensure configmaps are up to date
kubectl create configmap docker-registry-config --from-env-file=../docker-registry/.env --dry-run=client -o yaml | tee docker-registry-config.yaml

# apply configs
kubectl apply -f docker-registry-config.yml


kubectl apply -f infra.yml
