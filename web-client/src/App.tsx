import React, { FC } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
// import PrivateRoute from './components/hocs/PrivateRoute'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import Protected from './pages/Protected'
import Unauthorized from './pages/Unauthorized'
import Oidc from 'oidc-client'
import config from './config'
import { authKeys } from './constants'
import { AuthContextProvider } from './stores/AuthContext'

const mgr = new Oidc.UserManager(config.oidc)
// @ts-ignore
window.mgr = mgr

if (window.location.hash.includes('id_token')) {
    const params = window.location.hash
        .slice(1)
        .split('&')
        .reduce((acc, item) => {
            const [key, value] = item.split('=')
            return { ...acc, [key]: value }
        }, {})

    // @ts-ignore
    localStorage.setItem(authKeys.token, params.access_token)

    //------------------------------------
    // TODO: why is this still here?
    // @ts-ignore
    window.mgr
        .signinRedirectCallback()
        .then(() => {
            // @ts-ignore
            window.mgr.getUser().then(user => {
                if (!user) {
                    console.info('user not logged in')
                    return
                }

                window.location.hash = '#/'
            })
        })
        .catch((err: any) => {
            console.error(err)
        })
    //------------------------------------
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
                    <Route path="/protected" component={Protected} />
                    <Route path="/" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </AuthContextProvider>
    )
}

export default App
