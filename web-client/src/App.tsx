import React, { FC, createRef } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import NotificationSystem from 'react-notification-system'
import uiStore from './stores/UiStore'
import Navbar from './components/Navbar'
// import PrivateRoute from './components/hocs/PrivateRoute'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import Protected from './pages/Protected'
import Oidc from 'oidc-client'
import config from './config'
import { setBearer } from './api'
import { authKeys } from './constants'

if (!window.location.protocol.includes('https')) window.location.protocol = 'https:'

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
    console.log('access token', params.access_token)

    // @ts-ignore
    localStorage.setItem(authKeys.token, params.access_token)
    // @ts-ignore
    setBearer(params.access_token)

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
} else {
    const cachedToken = localStorage.getItem(authKeys.token)
    if (cachedToken) setBearer(cachedToken)
}

interface IAppProps {}
const App: FC<IAppProps> = props => {
    const notificationSystemRef: React.RefObject<any> = createRef()
    uiStore.init(notificationSystemRef)

    return (
        <Router>
            <div id="application">
                <NotificationSystem ref={notificationSystemRef} />

                <Navbar />
                <Switch>
                    <Route path="/login" component={Login} />

                    <Route path="/protected" component={Protected} />
                    <Route path="/" component={Home} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    )
}

export default App
