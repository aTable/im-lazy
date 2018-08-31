export const positions = {
    topRight: 'tr',
    topLeft: 'tl',
    topCenter: 'tc',
    bottomRight: 'br',
    bottomLeft: 'bl',
    bottomCenter: 'bc',
}

export const notificationTypes = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
}

export const dismissTypes = {
    both: 'both',
    click: 'click',
    button: 'button',
    none: 'none',
}
/**
 * Class representing a notification in the UI
 */
class UiNotification {
    /** title */
    title: string
    /** message */
    message: string
    /** level */
    level = notificationTypes.info
    /** position (top left, bottom right ..) */
    position = positions.topRight
    /** dismiss after seconds */
    autoDismiss = 5
    /** how the notification can be dismissed */
    dismissible = dismissTypes.both
    /** action */
    action?: {
        label: string
        callback: () => void
    }
    /** children */
    children?: JSX.Element
    /** onAdd */
    onAdd?: (notification: any) => void
    /** onRemove */
    onRemove?: (notification: any) => void

    /** ctor */
    constructor(title: string, message: string) {
        this.title = title
        this.message = message
    }
}
export default UiNotification
