provider "azurerm" {
  version = "=2.0.0"
  features {}
}

variable "sql_server_username" {
  type        = string
  description = "The SQL Server username"
}

variable "sql_server_password" {
  type        = string
  description = "The SQL Server password"
}

data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "yournamespace" {
  name     = "yournamespace"
  location = "Australia East"
}

resource "azurerm_storage_account" "storage" {
  name                      = "yournamespacestorage"
  resource_group_name       = azurerm_resource_group.yournamespace.name
  location                  = azurerm_resource_group.yournamespace.location
  account_kind              = "StorageV2"
  account_tier              = "Standard"
  account_replication_type  = "GRS"
  access_tier               = "Hot"
  enable_https_traffic_only = true
  static_website = {
    index_document     = "index.html"
    error_404_document = "index.html"
  }
  tags = {
    environment = "dev"
  }
}

resource "azurerm_sql_server" "sqlserver" {
  name                         = "yournamespacesqlserver"
  resource_group_name          = azurerm_resource_group.yournamespace.name
  location                     = azurerm_resource_group.yournamespace.location
  version                      = "12.0"
  administrator_login          = var.sql_server_username
  administrator_login_password = var.sql_server_password
  tags = {
    stage = "dev"
  }
}

resource "azurerm_sql_database" "database" {
  name                = "yournamespace-database"
  resource_group_name = azurerm_resource_group.yournamespace.name
  location            = azurerm_resource_group.yournamespace.location
  server_name         = azurerm_sql_server.sqlserver.name
  create_mode         = "Default"
  edition             = "Standard"
  tags = {
    stage = "dev"
  }
}

resource "azurerm_sql_database" "database-sts" {
  name                = "yournamespace-database-sts"
  resource_group_name = azurerm_resource_group.yournamespace.name
  location            = azurerm_resource_group.yournamespace.location
  server_name         = azurerm_sql_server.sqlserver.name
  create_mode         = "Default"
  edition             = "Standard"
  tags = {
    stage = "dev"
  }
}

# resource "azurerm_key_vault" "keyvault" {
#   name                        = "yournamespace-keyvault"
#   location                    = azurerm_resource_group.yournamespace.location
#   resource_group_name         = azurerm_resource_group.yournamespace.name
#   enabled_for_disk_encryption = true
#   tenant_id                   = data.azurerm_client_config.current.tenant_id
#   soft_delete_enabled         = true
#   purge_protection_enabled    = false
#   sku_name                    = "standard"

#   ### configure the access policy so that the principal of the AppService can access the certificate
#   # access_policy {
#   #   tenant_id = data.azurerm_client_config.current.tenant_id
#   #   object_id = data.azurerm_client_config.current.object_id

#   #   key_permissions = [
#   #     "get",
#   #   ]

#   #   secret_permissions = [
#   #     "get",
#   #   ]

#   #   storage_permissions = [
#   #     "get",
#   #   ]
#   # }

#   network_acls {
#     default_action = "Deny"
#     bypass         = "AzureServices"
#   }

#   tags = {
#     environment = "Testing"
#   }
# }

resource "azurerm_app_service_plan" "appserviceplan" {
  name                = "yournamespace-appserviceplan"
  resource_group_name = azurerm_resource_group.yournamespace.name
  location            = azurerm_resource_group.yournamespace.location
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "appservice" {
  name                = "yournamespace-appservice"
  location            = azurerm_resource_group.yournamespace.location
  resource_group_name = azurerm_resource_group.yournamespace.name
  app_service_plan_id = azurerm_app_service_plan.appserviceplan.id
  https_only          = true

  site_config {
    always_on                = false
    dotnet_framework_version = "v4.0"
    ftps_state               = "FtpsOnly"
    http2_enabled            = true
    websockets_enabled       = false
    scm_type                 = "LocalGit"
    # linux_fx_version = 
  }

  app_settings = {
    "SOME_KEY" = "some-value"
  }

  connection_string {
    name  = "Database"
    type  = "SQLServer"
    value = "Server=localhost;Integrated Security=SSPI"
  }
}

resource "azurerm_app_service" "appservice-sts" {
  name                = "yournamespace-sts"
  location            = azurerm_resource_group.yournamespace.location
  resource_group_name = azurerm_resource_group.yournamespace.name
  app_service_plan_id = azurerm_app_service_plan.appserviceplan.id
  https_only          = true

  site_config {
    always_on                = false
    dotnet_framework_version = "v4.0"
    ftps_state               = "FtpsOnly"
    http2_enabled            = true
    websockets_enabled       = false
    scm_type                 = "LocalGit"
    # linux_fx_version = 
  }

  app_settings = {
    "SOME_KEY" = "some-value"
  }

  connection_string {
    name  = "Database"
    type  = "SQLServer"
    value = "Server=localhost;Integrated Security=SSPI"
  }
}
