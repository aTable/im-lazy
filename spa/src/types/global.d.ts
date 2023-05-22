declare global {
    interface Window {
        mgr: Oidc.UserManager // TODO: doesnt work?
        MyNamespace: any
    }
}
