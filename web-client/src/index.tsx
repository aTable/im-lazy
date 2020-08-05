import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import $ from 'jquery'
import Popper from 'popper.js'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/regular.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './css/base.scss'

if (!window.location.protocol.includes('https')) window.location.protocol = 'https:'

// TODO: replace bootstrap with TailwindCSS, Bulma or bootstrap-v5-alpha
/* Shim to provide dependent plugins without ejecting create-react-app */
// @ts-ignore
window.jQuery = $
// @ts-ignore
window.$ = $
// @ts-ignore
window.Popper = Popper
require('bootstrap')

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
