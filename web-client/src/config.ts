import { UserManagerSettings } from 'oidc-client'

export interface IConfig {
    serverUri: string
    loginRoute: string
    postLoginRoute: string
    routerBasename: string
    oidc: UserManagerSettings
}

const config: IConfig = {
    serverUri: process.env.REACT_APP_SERVER_URI!,
    loginRoute: process.env.REACT_APP_LOGIN_ROUTE!,
    postLoginRoute: process.env.REACT_APP_POST_LOGIN_ROUTE!,
    routerBasename: process.env.REACT_APP_CLIENT_SIDE_ROUTER_BASENAME!,
    oidc: {
        authority: process.env.REACT_APP_OIDC_AUTHORIZATION_SERVER_URI,
        client_id: 'single-page-app',
        redirect_uri: process.env.REACT_APP_OIDC_REDIRECT_URI,
        response_type: 'id_token token',
        scope: 'openid profile email myawesomeapi.full_access myawesomeapi.app_access',
        post_logout_redirect_uri: process.env.REACT_APP_OIDC_LOGOUT_REDIRECT_URI,
        // automaticSilentRenew: false,
        // silent_redirect_uri: "https://localhost:3000/silent-renew"
    },
}

export default config
