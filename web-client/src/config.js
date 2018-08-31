export const environmentTypes = {
  Debug: 'Debug',
  Dev: 'Dev',
  Uat: 'Uat',
  Release: 'Release',
}
const TARGET_BUILD_ENVIRONMENT = environmentTypes[process.env.REACT_APP_BUILD_ENVIRONMENT]

let config = {
  environmentType: TARGET_BUILD_ENVIRONMENT,
  serverUri: '',
  redirectSuccessfulLoginRoute: '#/',
  adal: {
    tenant: 'your_tenant.com',
    clientId: 'your_application_id_which_is_apparently_the_client_id',
    //extraQueryParameter: 'nux=1',
    //disableRenewal: true,
    // endpoints: {
    //     'https://graph.microsoft.com': 'https://graph.microsoft.com'
    // },
    redirectUri: '',
    cacheLocation: 'localStorage',
    get postLogoutRedirectUri() {
      const loggedOutRoutePath = '#/LoggedOut'
      return this.redirectUri + loggedOutRoutePath
    },
  },
}

switch (config.environmentType) {
  case environmentTypes.Debug:
    config.serverUri = 'https://localhost/Your.Namespace.WebApi'
    break
  case environmentTypes.Dev:
    break
  case environmentTypes.Uat:
    break
  case environmentTypes.Release:
    config.serverUri = 'https://your_published_url'
    break
  default:
    break
}

export default config
