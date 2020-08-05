import React, { FC } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import Health from './pages/Health'
import Artists from './pages/Artists'
import Artist from './pages/Artist'
import Protected from './pages/Protected'
import Unauthorized from './pages/Unauthorized'
import Oidc, { User } from 'oidc-client'
import config from './config'
import { AuthContextProvider, authKeys } from './stores/AuthContext'
import { mutateQueryStringWithoutReload } from './utils/utils'
import LoggedOut from './pages/LoggedOut'
import { client } from './api/api'
import { ApolloProvider } from '@apollo/client'

const mgr = new Oidc.UserManager(config.oidc)
// @ts-ignore
window.mgr = mgr
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
        <ApolloProvider client={client}>
            <AuthContextProvider>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route path="/health" component={Health} />
                        <Route path="/artists/:artistId" component={Artist} />
                        <Route path="/artists" component={Artists} />
                        <Route path="/login" component={Login} />
                        <Route path="/unauthorized" component={Unauthorized} />
                        <Route path="/logged-out" component={LoggedOut} />
                        <Route path="/protected" component={Protected} />
                        <Route path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </AuthContextProvider>
        </ApolloProvider>
    )
}

export default App
