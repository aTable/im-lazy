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

resource "azurerm_resource_group" "yournamespace" {
  name     = "yournamespace"
  location = "Australia East"
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

resource "azurerm_sql_database" "sqlserverdatabase" {
  name                = "yournamespacedatabase"
  resource_group_name = azurerm_resource_group.yournamespace.name
  location            = azurerm_resource_group.yournamespace.location
  server_name         = azurerm_sql_server.sqlserver.name
  create_mode         = "Default"
  edition             = "Standard"
  tags = {
    stage = "dev"
  }
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
