import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import $ from 'jquery'
import Popper from 'popper.js'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/regular.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
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

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
