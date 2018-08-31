provider "azurerm" {
  version = "=1.44.0"
}


resource "azurerm_resource_group" "rg" {
  name     = "personal"
  location = "Australia East"
}

resource "azurerm_container_registry" "acr" {
  name                = "personalcontainerregistry3"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "azurerm_app_service_plan" "dockerappplan" {
  name                = "dockertest-appserviceplan"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  kind                = "Linux"
  reserved            = true
  sku {
    tier = "Basic"
    size = "B3"
  }
}

resource "azurerm_app_service" "docker1appservice" {
  name                = "docker1-app-service"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  app_service_plan_id = azurerm_app_service_plan.dockerappplan.id

  site_config {
    ftps_state = "FtpsOnly"
    # cat docker-compose.yml | base64
    linux_fx_version = "COMPOSE|dmVyc2lvbjogIjMiCnNlcnZpY2VzOgogICAgd2ViOgogICAgICAgIGltYWdlOiAiYXBwc3Zjc2FtcGxlL2FzcCIKICAgICAgICAjIHRoZSBzb3VyY2UgcmVwbyBpcyBhdCBodHRwczovL2dpdGh1Yi5jb20veWlsaWFvbXNmdC9jb21wb3NlLWFzcC1zcWwKICAgICAgICBwb3J0czoKICAgICAgICAgICAgLSAiODA4MDo4MCIKICAgICAgICBkZXBlbmRzX29uOgogICAgICAgICAgICAtIGRiCiAgICBkYjoKICAgICAgICBpbWFnZTogIm1pY3Jvc29mdC9tc3NxbC1zZXJ2ZXItbGludXgiCiAgICAgICAgZW52aXJvbm1lbnQ6CiAgICAgICAgICAgIFNBX1BBU1NXT1JEOiAiWW91cl9wYXNzd29yZDEyMyIKICAgICAgICAgICAgQUNDRVBUX0VVTEE6ICJZIg=="
    http2_enabled    = true
  }

  app_settings = {
    "SOME_KEY" = "some-value"
  }

  connection_string {
    name  = "Database"
    type  = "SQLServer"
    value = "imaconnectionstring"
  }
}
