param(
    [Parameter(mandatory = $true)][string]$BUILD_ENVIRONMENT
)
########## project specific variables ##########
$storageContainerBaseName = "BLOB STORAGE CONTAINER TO HOLD THE FRONT END e.g. 'my-app'" # Dev builds will automatically be named 'my-app-dev'
$relativePathToFrontEndBuildFolder = ".\build"	
################################################

Write-Host "build-log: WEB CLIENT DEPLOYMENT STARTING" -ForegroundColor White
Write-Host "build-log: importing support scripts" -ForegroundColor White
. "..\deployment\deployment-helpers.ps1"
. "..\deployment\deployment-variables.ps1"

Write-Host "build-log: applying environment overrides" -ForegroundColor White
$storageContainerName = $storageContainerBaseName + (getStorageContainerSuffix -BUILD_ENVIRONMENT $BUILD_ENVIRONMENT)

Write-Host "build-log: purging blobs in $storageContainerName" -ForegroundColor White
Remove-AzureBlobs -storageContext $storageCtx -storageContainerName $storageContainerName
$rootFolderToUpload = Resolve-Path $relativePathToFrontEndBuildFolder
Write-Host "build-log: uploading blobs to $storageContainerName" -ForegroundColor White
Add-AzureBlobs -storageContext $storageCtx -rootFolderAbsolutePath $rootFolderToUpload -storageContainerName $storageContainerName

Write-Host "build-log: WEB CLIENT DEPLOYMENT COMPLETE" -ForegroundColor DarkGreen
