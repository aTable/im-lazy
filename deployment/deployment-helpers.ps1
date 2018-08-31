function throwOnFailure {
    param (
        [Parameter(mandatory = $true)][string]$message
    )
    if ($LASTEXITCODE -eq 1) {
        throw $message
    }
}


<#
.SYNOPSIS
Creates a suffix to use (depending on on the build environment) for provisioning resources

.DESCRIPTION
Creates a suffix to use (depending on on the build environment) for provisioning resources

.PARAMETER BUILD_ENVIRONMENT
The build environment for the project. This should come from a predefined set of values

.EXAMPLE
getStorageContainerSuffix -BUILD_ENVIRONMENT Dev
> "dev"

.EXAMPLE
getStorageContainerSuffix -BUILD_ENVIRONMENT Uat
> "uat"

.EXAMPLE
getStorageContainerSuffix -BUILD_ENVIRONMENT Prod
>  "" (note the empty suffix)
#>
function Get-StorageContainerSuffix {
    param(
        [Parameter(mandatory = $true)]
        [string]$BUILD_ENVIRONMENT
    )

    if ($BUILD_ENVIRONMENT -eq "Debug") {
        throw "script is not intended to deploy locally"
    }
    elseif ($BUILD_ENVIRONMENT -eq "Dev") {
        return "-" + $BUILD_ENVIRONMENT.ToLower()	
    }
    elseif ($BUILD_ENVIRONMENT -eq "Uat") {
        return "-" + $BUILD_ENVIRONMENT.ToLower()
    }
    elseif ($BUILD_ENVIRONMENT -eq "Release") {
        return ""
    }
    else {
        throw "unsupported BUILD_ENVIRONMENT: $BUILD_ENVIRONMENT"
    }
}


function Remove-AzureBlobs {
    param(
        [Parameter(Mandatory = $true)][object]$storageContext,
        [Parameter(Mandatory = $true)][string]$storageContainerName
    )

    # Get a reference to a list of all blobs in a container.
    $blobs = Get-AzureStorageBlob -Container $storageContainerName -Context $storageContext
 
    # purge existing blobs
    $blobs | Remove-AzureStorageBlob 
}

function Add-AzureBlobs {
    param(
        [Parameter(Mandatory = $true)][object]$storageContext,
        [Parameter(Mandatory = $true)][string]$rootFolderAbsolutePath,
        [Parameter(Mandatory = $true)][string]$storageContainerName
    )
        
    Get-ChildItem $rootFolderAbsolutePath -Recurse | ForEach-Object {

        $extension = [System.IO.Path]::GetExtension($_.Name)
        $blobProperties = @{ }
        switch ($extension) {
            # images
            ".jpg" { $blobProperties.Add("ContentType", "image/jpeg") }  
            ".jpeg" { $blobProperties.Add("ContentType", "image/jpeg") } 
            ".jpe" { $blobProperties.Add("ContentType", "image/jpeg") } 
            ".gif" { $blobProperties.Add("ContentType", "image/gif") } 
            ".png" { $blobProperties.Add("ContentType", "image/png") }
            # web 
            ".html" { $blobProperties.Add("ContentType", "text/html") }
            ".ico" { $blobProperties.Add("ContentType", "image/x-icon") }
            ".css" { $blobProperties.Add("ContentType", "text/css") }
            ".js" { $blobProperties.Add("ContentType", "application/javascript") }            
            ".map" { $blobProperties.Add("ContentType", "application/octet-stream") }
            ".json" { $blobProperties.Add("ContentType", "application/json") }           
            # fonts
            ".woff" { $blobProperties.Add("ContentType", "application/x-font-woff") }
            ".woff2" { $blobProperties.Add("ContentType", "application/octet-stream") }
            ".ttf" { $blobProperties.Add("ContentType", "application/x-font-ttf") }
            ".eot" { $blobProperties.Add("ContentType", "application/vnd.ms-fontobject") }
         
            default { $blobProperties.Add("ContentType", "application/octet-stream") } 
        }
        
        $isFolder = $_.PSIsContainer
        
        if (!$isFolder) {
            $absoluteFilePath = $_.FullName
            $relativeFilePath = $_.FullName.Replace("$rootFolderAbsolutePath\", "")
            Set-AzureStorageBlobContent -File $absoluteFilePath -Context $storageContext -Container $storageContainerName -Force -Properties $blobProperties -Blob $relativeFilePath
        }
    }
}