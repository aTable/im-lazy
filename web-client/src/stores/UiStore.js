import { decorate } from 'mobx'
import UiNotification from '../models/UiNotification'

/**
 * UI state goes into this store to keep your domain models clean
 */
class UiStore {
  notificationSystemRef = null

  init(notificationSystemRef) {
    this.notificationSystemRef = notificationSystemRef
  }

  /**
   * sends a notification to the user
   * @param {string} title title
   * @param {string} message message
   */
  notify(title, message) {
    const notification = new UiNotification(title, message)
    this.notificationSystemRef.current.addNotification(notification)
  }
}

decorate(UiStore, {})

export default new UiStore()
