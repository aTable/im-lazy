import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
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
import LoggedOut from './pages/LoggedOut'
import { client, setBearer } from './api/api'
import { ApolloProvider } from '@apollo/client'
import ErrorBoundary from './components/ErrorBoundary'
import { UiContextProvider } from './stores/UiContext'
import Todos from './pages/Todos'
import TodoCreateUpdate from './pages/TodoCreateUpdate'
import Test from './pages/Test'

import { QueryClient, QueryClientProvider } from 'react-query'
import ScrollToTop from './components/ScrollToTop'
import BootstrapTooltipActivator from './components/BootstrapTooltipActivator'
import SigninOidc from './pages/Signin-oidc'
import SignoutOidc from './pages/Signout-oidc'
import { extractParamsFromHash } from './utils/utils'
const queryClient = new QueryClient()

const mgr = new Oidc.UserManager(config.oidc)
// @ts-ignore
window.mgr = mgr

const hashParams = extractParamsFromHash(window.location.hash)
const isImplicitGrantSignin = hashParams['access_token'] && hashParams['token_type'] === 'Bearer'
const locationFromAuthorizationServer = window.location.href
window.location.hash = '#/'
if (isImplicitGrantSignin) {
    mgr.signinRedirectCallback(locationFromAuthorizationServer)
        .then((user: User) => {
            console.log('user', user)
            setBearer(user.access_token)
            localStorage.setItem(authKeys.user, user.toStorageString())
        })
        .catch((err: Error) => {
            console.error(err)
        })
} else {
    const userSerialized = localStorage.getItem(authKeys.user)
    if (userSerialized) {
        const user: User = User.fromStorageString(userSerialized)
        setBearer(user.access_token)
    }
}
// if (window.location.search.includes('code')) {
//     ;(window as any).mgr
//         .signinRedirectCallback()
//         .then((user: User) => {
//             localStorage.setItem(authKeys.user, user.toStorageString())
//             mutateQueryStringWithoutReload()
//         })
//         .catch((err: any) => {
//             console.error(err)
//         })
// }

interface IAppProps {}

/**
 * The root of the application built with [TypeScript](https://www.typescriptlang.org/)
 * @param props The props
 */
const App = (props: IAppProps) => {
    useEffect(() => {
        // do init
        console.log('App.tsx useEffect init')
    }, [])

    return (
        <QueryClientProvider client={queryClient}>
            <UiContextProvider>
                <ToastContainer />
                <ApolloProvider client={client}>
                    <AuthContextProvider>
                        <Router basename={''}>
                            <ScrollToTop />
                            <BootstrapTooltipActivator />
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
                                    <Route path="/todos/:id" component={TodoCreateUpdate} />
                                    <Route path="/todos" component={Todos} />
                                    <Route path="/test" component={Test} />
                                    <Route path="/signin-oidc" component={SigninOidc} />
                                    <Route path="/signout-oidc" component={SignoutOidc} />

                                    <Route exact path="/" component={Home} />
                                    <Route component={NotFound} />
                                </Switch>
                            </ErrorBoundary>
                        </Router>
                    </AuthContextProvider>
                </ApolloProvider>
            </UiContextProvider>
        </QueryClientProvider>
    )
}

export default App
