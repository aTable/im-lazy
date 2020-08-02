import React, { FC } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import Protected from './pages/Protected'
import Unauthorized from './pages/Unauthorized'
import Oidc, { User } from 'oidc-client'
import config from './config'
import { AuthContextProvider, authKeys } from './stores/AuthContext'
import { mutateQueryStringWithoutReload } from './utils/utils'
import LoggedOut from './pages/LoggedOut'

const mgr = new Oidc.UserManager(config.oidc)
// @ts-ignore
window.mgr = mgr
debugger
if (window.location.search.includes('code')) {
    ;(window as any).mgr
        .signinRedirectCallback()
        .then((user: User) => {
            localStorage.setItem(authKeys.user, user.toStorageString())
            mutateQueryStringWithoutReload()
        })
        .catch((err: any) => {
            console.error(err)
        })
}

interface IAppProps {}
const App: FC<IAppProps> = () => {
    return (
        <AuthContextProvider>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/login" component={Login} />

                    <Route path="/unauthorized" component={Unauthorized} />
                    <Route path="/logged-out" component={LoggedOut} />
                    <Route path="/protected" component={Protected} />
                    <Route path="/" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </AuthContextProvider>
    )
}

export default App
