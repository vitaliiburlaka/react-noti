import { MSG_TYPE, DEFAULTS } from './utils/constants'
import { generateUID } from './utils/helpers'

class Notify {
  #toasts = []

  #config = {
    autoDismiss: DEFAULTS.autoDismiss,
    timeOut: DEFAULTS.timeOut,
    single: DEFAULTS.single,
  }

  #onStoreChange = null

  #createToast = ({
    type,
    content,
    title,
    autoDismiss = this.#config.autoDismiss,
    timeOut = this.#config.timeOut,
  }) => {
    return {
      id: generateUID(),
      type,
      content,
      title,
      autoDismiss,
      timeOut,
    }
  }

  #addToast = (toast) => {
    if (this.#config.single) {
      this.#toasts.length = 0 // Clears the toasts array
      this.#toasts.push(toast)
    } else {
      this.#toasts.unshift(toast)
    }

    this.#onStoreChange(this.#toasts)
  }

  success = (content, { title, autoDismiss, timeOut } = {}) => {
    const toast = this.#createToast({
      type: MSG_TYPE.SUCCESS,
      content,
      title,
      autoDismiss,
      timeOut,
    })

    this.#addToast(toast)
  }

  info = (content, { title, autoDismiss, timeOut } = {}) => {
    const toast = this.#createToast({
      type: MSG_TYPE.INFO,
      content,
      title,
      autoDismiss,
      timeOut,
    })

    this.#addToast(toast)
  }

  warning = (content, { title, autoDismiss, timeOut } = {}) => {
    const toast = this.#createToast({
      type: MSG_TYPE.WARNING,
      content,
      title,
      autoDismiss,
      timeOut,
    })

    this.#addToast(toast)
  }

  error = (content, { title, autoDismiss, timeOut } = {}) => {
    const toast = this.#createToast({
      type: MSG_TYPE.ERROR,
      content,
      title,
      autoDismiss,
      timeOut,
    })

    this.#addToast(toast)
  }

  dismiss = (id) => {
    if (!id) {
      // Dismisses all
      this.#toasts.length = 0
    } else {
      this.#toasts = this.#toasts.filter((item) => item.id !== id)
    }

    this.#onStoreChange(this.#toasts)
  }

  configure({ autoDismiss, timeOut, single }) {
    this.#config = {
      ...this.#config,
      autoDismiss,
      timeOut,
      single,
    }
  }

  register({ handleStoreChange }) {
    this.#onStoreChange = handleStoreChange
  }
}

export default new Notify()
