param(
    [Parameter(mandatory = $true)][string]$BUILD_ENVIRONMENT
)
# save the current working directory to revert back to it at the end of the script to make this CLI friendly
$originalWorkingDirectory = Resolve-Path .

### back end
Set-Location $originalWorkingDirectory
Set-Location ../server/Your.Namespace.WebApi
& ./deploy.ps1 -BUILD_ENVIRONMENT $BUILD_ENVIRONMENT

###  front end
Set-Location $originalWorkingDirectory
Set-Location ../web-client
& ./deploy.ps1 -BUILD_ENVIRONMENT $BUILD_ENVIRONMENT

Write-Host "build-log: DEPLOYMENT COMPLETE" -ForegroundColor DarkGreen

Set-Location $originalWorkingDirectory