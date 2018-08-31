import { computed, decorate, observable } from 'mobx'
import config from '../config'
import {} from '../api'
import AuthStore from './AuthStore'

/**
 * Monolithic store representing your applications state. Add additional stores broken down into domains as required
 */
class AppStore {
  name = 'hello computer'
  get nameLength() {
    return this.name.length
  }

  /**
   * Any domain stores that need to interact with each other need to be registered
   */
  constructor() {
    this.authStore = new AuthStore(this)
  }

  init() {
    // this.initSignalR()
  }

  initSignalR() {
    let connection = window.jQuery.hubConnection(`${config.serverUrl}/signalr`, { useDefaultPath: false, logging: true })
    let proxy = connection.createHubProxy('YOUR_HUB')
    proxy.connection.qs = {
      accessToken: 'accessssssTokenn',
    }

    connection.error(err => {
      console.warn('signalr error: ', err)
    })

    proxy.connection.start().done(e => {
      proxy.invoke('ping')
      console.log('connected to real time via', e.transport.name)
    })

    proxy.on('pong', () => {
      console.log('pong')
    })
  }
}

decorate(AppStore, {
  name: observable,
  nameLength: computed,
})

export default new AppStore()
