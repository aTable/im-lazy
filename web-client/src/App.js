import React, { Component, createRef } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import NotificationSystem from 'react-notification-system'
import { Provider, observer } from 'mobx-react'
import { configure } from 'mobx'
import AppStore from './stores/AppStore'
import uiStore from './stores/UiStore'

import Navbar from './components/Navbar'
import PrivateRoute from './components/hocs/PrivateRoute'
import MobxDevToolsWrapper from './components/MobxDevToolsWrapper'

import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Login from './pages/Login'
import Protected from './pages/Protected'

configure({ enforceActions: 'always' })

class App extends Component {
  notificationSystemRef = createRef()

  componentDidMount() {
    AppStore.init()
    uiStore.init(this.notificationSystemRef)
  }

  render() {
    return (
      <Provider store={AppStore} uiStore={uiStore}>
        <Router>
          <div id="application">
            <MobxDevToolsWrapper />
            <NotificationSystem ref={this.notificationSystemRef} />

            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />

              <PrivateRoute exact path="/protected" component={Protected} />

              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default observer(App)
