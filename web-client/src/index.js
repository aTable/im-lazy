import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import config from './config'
import $ from 'jquery'
import Popper from 'popper.js'
import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css'
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'
import 'bootstrap/dist/css/bootstrap.css'
import './css/base.css'

/*
----------------------------------------------------------------------
  Shim to provide dependent plugins without ejecting create-react-app
*/
window.jQuery = $
window.$ = $
window.Popper = Popper
require('./vendor/jquery.signalR-2.2.1')
require('bootstrap')
/* ------------------------------------------------------------------- */

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()

/*
  support hot reloading
*/
if (config.isLocal && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(<NextApp />, document.getElementById('root'))
  })
}
