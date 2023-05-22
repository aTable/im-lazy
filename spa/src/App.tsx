import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { User } from 'oidc-client'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import Health from './pages/Health'
import Speakers from './pages/Speakers'
import LoggedOut from './pages/LoggedOut'
import Unauthorized from './pages/Unauthorized'
import Todos from './pages/Todos'
import TodoCreateUpdate from './pages/TodoCreateUpdate'
import Test from './pages/Test'
import Weather from './pages/Weather'
import { AuthContextProvider, authKeys } from './stores/AuthContext'
import { setBearer } from './api/api'
import { UiContextProvider } from './stores/UiContext'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'

import { QueryClientProvider } from 'react-query'
import ScrollToTop from './components/ScrollToTop'
import BootstrapTooltipActivator from './components/BootstrapTooltipActivator'
import SigninOidc from './pages/Signin-oidc'
import SignoutOidc from './pages/Signout-oidc'
import { extractParamsFromHash } from './utils/utils'
import TriggerError from './components/TriggerError'

import { mgr, queryClient } from './App-state'
import Speaker from './pages/Speaker'

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
                <AuthContextProvider>
                    <Router basename={''}>
                        <ScrollToTop />
                        <BootstrapTooltipActivator />
                        <Navbar />
                        <ErrorBoundary>
                            <Routes>
                                <Route path="health" element={<Health />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/unauthorized" element={<Unauthorized />} />
                                <Route path="/logged-out" element={<LoggedOut />} />
                                <Route path="/error-demo" element={<TriggerError />} />
                                <Route path="/todos/:id" element={<TodoCreateUpdate />} />
                                <Route path="/todos" element={<Todos />} />
                                <Route path="/test" element={<Test />} />
                                <Route path="/signin-oidc" element={<SigninOidc />} />
                                <Route path="/signout-oidc" element={<SignoutOidc />} />
                                <Route path="/" element={<Home />} />
                                <Route path="weather" element={<Weather />} />
                                <Route path="speakers" element={<Speakers />} />
                                <Route path="speakers/:id" element={<Speaker />} />
                                <Route path="*" element={NotFound} />
                            </Routes>
                        </ErrorBoundary>
                    </Router>
                </AuthContextProvider>
            </UiContextProvider>
        </QueryClientProvider>
    )
}

export default App
