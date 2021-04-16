# a super basic containerized version of the app so it can 
# be added to the cluster and service mesh for a fuller demo
docker build -t rustmicroservice:latest .
docker run -p 8000:8000 rustmicroservice:latest
