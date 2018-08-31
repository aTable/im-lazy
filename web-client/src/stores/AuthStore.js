import { action, reaction, computed, decorate, observable } from 'mobx'
import moment from 'moment'

// import config from "../config"
import { setBearerToken, get2LeggedToken } from '../api'

const storageTokenKey = 'auth.security.token'
const storageTokenExpiresAtISOStringKey = 'auth.security.expiresAt'

/**
 * Store representing the applications authentication and authorization to keep your domain models clean
 */
class AuthStore {
  token = 'blank token'
  expiresAtMoment = null
  get isAuthenticated() {
    return !!this.token && this.isTokenValid
  }
  get isTokenValid() {
    return moment().isBefore(moment(this.expiresAtMoment))
  }

  constructor(rootStore) {
    this.rootStore = rootStore

    reaction(() => this.token, token => window.localStorage.setItem(storageTokenKey, token))
    reaction(() => this.expiresAtMoment, expiryMoment => window.localStorage.setItem(storageTokenExpiresAtISOStringKey, expiryMoment.toISOString()))
  }

  setToken(token) {
    this.token = token
  }

  setExpiresAtMoment(moment) {
    this.expiresAtMoment = moment
  }

  authorize() {
    return this.authorize2Legged()
  }

  authorize2Legged() {
    return get2LeggedToken().then(res => {
      this.setAuthDetails(
        res.access_token,
        moment()
          .add(res.expires_in, 's')
          .toISOString()
      )
    })
  }

  setAuthDetails(token, expiresAtISOString) {
    this.setToken(token)
    this.setExpiresAtMoment(moment(expiresAtISOString))
    if (this.isTokenValid) setBearerToken(token)
  }

  init() {
    const is3LeggedToken = window.location.href.includes('access_token')
    let token = null
    let expiresAtISOString = null

    if (is3LeggedToken) {
      const params = window.location.href
        .split('#/')[1]
        .split('&')
        .reduce((prev, x) => {
          const keyVal = x.split('=')
          return { ...prev, [keyVal[0]]: keyVal[1] }
        }, {})
      token = params.access_token
      expiresAtISOString = moment()
        .add(params.expires_in, 's')
        .toISOString()
    } else {
      token = window.localStorage.getItem(storageTokenKey)
      expiresAtISOString = window.localStorage.getItem(storageTokenExpiresAtISOStringKey)
    }

    this.setAuthDetails(token, expiresAtISOString)

    if (is3LeggedToken) {
      window.location.href = '#/'
    }
  }
}

decorate(AuthStore, {
  token: observable,
  expiresAtMoment: observable,
  isAuthenticated: computed,
  isTokenValid: computed,
  setToken: action,
  setExpiresAtMoment: action,
  authorize: action,
  authorize2Legged: action,
  setAuthDetails: action,
})

export default AuthStore
