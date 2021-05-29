# kind
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml
kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/usage.yaml
CLUSTER_NAME=clusterr
kind load docker-image yournamespaceapi:latest --name=$CLUSTER_NAME
kind load docker-image yournamespaceapi2:latest --name=$CLUSTER_NAME
kind load docker-image yournamespaceapi3:latest --name=$CLUSTER_NAME
kind load docker-image yournamespaceapi4:latest --name=$CLUSTER_NAME
kubectl apply -f test.yml
kubectl apply -f test-ingress.yml

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


# kubectl apply -f app.yml