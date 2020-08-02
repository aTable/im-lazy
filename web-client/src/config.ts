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
        client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
        redirect_uri: process.env.REACT_APP_OIDC_REDIRECT_URI,
        response_type: process.env.REACT_APP_OIDC_RESPONSE_TYPE,
        scope: process.env.REACT_APP_OIDC_SCOPE,
        post_logout_redirect_uri: process.env.REACT_APP_OIDC_LOGOUT_REDIRECT_URI,
        automaticSilentRenew: (process.env.REACT_APP_OIDC_ENABLE_SILENT_RENEW! as unknown) as boolean,
        loadUserInfo: (process.env.REACT_APP_OIDC_LOAD_USER_INFO! as unknown) as boolean,
        // silent_redirect_uri: "https://localhost:3000/silent-renew"
    },
}

export default config
