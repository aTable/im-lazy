import React, { useRef } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import Health from './pages/Health'
import Artists from './pages/Artists'
import AlbumFinder from './pages/AlbumFinder'
import Artist from './pages/Artist'
import Protected from './pages/Protected'
import ErrorDemo from './pages/ErrorDemo'
import Unauthorized from './pages/Unauthorized'
import Oidc, { User } from 'oidc-client'
import config from './config'
import { AuthContextProvider, authKeys } from './stores/AuthContext'
import { mutateQueryStringWithoutReload } from './utils/utils'
import LoggedOut from './pages/LoggedOut'
import { client } from './api/api'
import { ApolloProvider } from '@apollo/client'
import NotificationSystem from 'react-notification-system'
import ErrorBoundary from './components/ErrorBoundary'

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

/**
 * The root of the application built with [TypeScript](https://www.typescriptlang.org/)
 * @param props The props
 */
const App = (props: IAppProps) => {
    const notificationSystem = useRef(null)
    // @ts-ignore
    window.notificationSystem = notificationSystem

    return (
        <ApolloProvider client={client}>
            <NotificationSystem ref={notificationSystem} />
            <AuthContextProvider notificationSystem={notificationSystem}>
                <Router>
                    <Navbar />
                    <ErrorBoundary>
                        <Switch>
                            <Route path="/health" component={Health} />
                            <Route path="/artists/:artistId" component={Artist} />
                            <Route path="/artists" component={Artists} />
                            <Route path="/album-finder" component={AlbumFinder} />
                            <Route path="/login" component={Login} />
                            <Route path="/unauthorized" component={Unauthorized} />
                            <Route path="/logged-out" component={LoggedOut} />
                            <Route path="/protected" component={Protected} />
                            <Route path="/error-demo" component={ErrorDemo} />
                            <Route path="/" component={Home} />
                            <Route component={NotFound} />
                        </Switch>
                    </ErrorBoundary>
                </Router>
            </AuthContextProvider>
        </ApolloProvider>
    )
}

export default App