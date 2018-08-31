import UiNotification from '../models/UiNotification'

/**
 * UI state goes into this store to keep your domain models clean
 */
class UiStore {
    notificationSystemRef: React.RefObject<any> | null = null

    init(notificationSystemRef: React.RefObject<any>) {
        this.notificationSystemRef = notificationSystemRef
    }

    /**
     * sends a notification to the user
     * @param {string} title title
     * @param {string} message message
     */
    notify(title: string, message: string) {
        const notification = new UiNotification(title, message)
        this.notificationSystemRef!.current.addNotification(notification)
    }
}

export default new UiStore()
