# kind
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml

# helm charts
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install -f helm-configs/kube-prometheus-stack.yml prometheus-community/kube-prometheus-stack --generate-name

helm repo add hashicorp https://helm.releases.hashicorp.com
helm install -f helm-configs/vault.yml vault hashicorp/vault

helm repo add linkerd https://helm.linkerd.io/stable

# ensure configmaps are up to date
kubectl create configmap docker-registry-config --from-env-file=../docker-registry/.env --dry-run=client -o yaml | tee docker-registry-config.yaml

# apply configs
kubectl apply -f docker-registry-config.yml

kind load docker-image yournamespaceapi:dev --name=example-cluster
# kubectl apply -f app.yml