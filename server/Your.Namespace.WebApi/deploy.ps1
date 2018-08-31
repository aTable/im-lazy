param (
    [Parameter(mandatory = $true)][string]$BUILD_ENVIRONMENT,
    [string]$publishProfile = "FolderProfile.pubxml",
    [string]$verbosity = "quiet"
)

$ErrorActionPreference = "Stop"
$currentDirectoryName = (Get-Item -Path ".\").Name
. "..\..\deployment\deployment-helpers.ps1"
. "..\..\deployment\deployment-variables.ps1"

#dotnet publish /p:PublishProfile=$publishProfile /p:Password="$webApiPublishProfilePassword" --verbosity $verbosity
dotnet publish /p:PublishProfile=$publishProfile --verbosity $verbosity
throwOnFailure -message "${currentDirectoryName}: publish error"

Write-Host "${currentDirectoryName}: deployment success" -ForegroundColor DarkGreen