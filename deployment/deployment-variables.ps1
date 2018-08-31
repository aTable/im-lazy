# NOTE: the purpose of this file contradicts proper security measures. 
#       It contains deployment secrets that should never be checked into source control however,
#       for simplicity, it exists and is easily replaced by moving these to environment variables

$storageAccountName = "AZURE STORAGE ACCOUNT NAME "
$storageAccountKey = "KEY"
# $storageCtx = New-AzureStorageContext -StorageAccountName $storageAccountName -StorageAccountKey $storageAccountKey
