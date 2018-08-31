const positions = {
  topRight: 'tr',
  topLeft: 'tl',
  topCenter: 'tc',
  bottomRight: 'br',
  bottomLeft: 'bl',
  bottomCenter: 'bc',
}

const notificationTypes = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
}

const dismissTypes = {
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
  title
  /** message */
  message
  /** level */
  level = notificationTypes.info
  /** position (top left, bottom right ..) */
  position = positions.topRight
  /** dismiss after seconds */
  autoDismiss = 5
  /** how the notification can be dismissed */
  dismissible = dismissTypes.both
  /** action */
  action
  /** children */
  children
  /** onAdd */
  onAdd
  /** onRemove */
  onRemove
  //uid

  /** ctor */
  constructor(title, message) {
    this.title = title
    this.message = message
  }
}
export default UiNotification
