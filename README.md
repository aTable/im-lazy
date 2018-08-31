# Rules

- each deployable project contains it's own `build.ps1` and `deploy.ps1` scripts
- `~/deployment` contains all supporting scripts 
- `~/deployment/deployment.ps1` is the root deploy script that invokes the project specific `deploy.ps1` scripts
