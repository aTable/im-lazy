# Boilerplate

## Provisioning

Follow [this guide](https://docs.microsoft.com/en-us/aspnet/core/security/docker-https?view=aspnetcore-3.1) to generate your self signed certificate and trust it.

https://andrewlock.net/creating-and-trusting-a-self-signed-certificate-on-linux-for-use-in-kestrel-and-asp-net-core/

```bash
dotnet dev-certs https -ep ${HOME}/.aspnet/https/yournamespaceapi.pfx -p YOUR_PASSWORD
openssl pkcs12 -in ${HOME}/.aspnet/https/yournamespaceapi.pfx -out ${HOME}/.aspnet/https/yournamespaceapi.crt
sudo cp ${HOME}/.aspnet/https/yournamespaceapi.crt /usr/local/share/ca-certificates/
sudo chmod 644 /usr/local/share/ca-certificates/yournamespaceapi.crt
sudo dpkg-reconfigure ca-certificates
sudo update-ca-certificates
```

Do this for each certificate needed

## Building

```bash
az account set --subscription="${YOUR_SUBSCRIPTION_ID}"
az login
az acr login --name ${YOUR_REGISTRY_NAME}
docker tag yournamespaceapi ${YOUR_REGISTRY_NAME}.azurecr.io/yournamespaceapi/api
docker push ${YOUR_REGISTRY_NAME}.azurecr.io/yournamespace/api
```

## Deploying

// TODO:
