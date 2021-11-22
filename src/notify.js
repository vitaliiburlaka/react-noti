import { MSG_TYPE, defaultOptions } from './utils/constants'
import { generateUID } from './utils/helpers'

class Notify {
  #toasts = []

  #config = {
    autoDismiss: defaultOptions.autoDismiss,
    timeOut: defaultOptions.timeOut,
    single: defaultOptions.single,
    pauseOnHover: defaultOptions.pauseOnHover,
    showProgress: defaultOptions.showProgress,
  }

  #onStoreChange = () => {}

  #createToast = (type, content, options) => {
    const {
      title,
      autoDismiss = this.#config.autoDismiss,
      timeOut = this.#config.timeOut,
      pauseOnHover = this.#config.pauseOnHover,
      showProgress = this.#config.showProgress,
    } = options
    return {
      id: generateUID(),
      type,
      content,
      title,
      autoDismiss,
      timeOut,
      pauseOnHover,
      showProgress,
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

  success = (content, options = {}) => {
    const toast = this.#createToast(MSG_TYPE.SUCCESS, content, options)

    this.#addToast(toast)
  }

  info = (content, options = {}) => {
    const toast = this.#createToast(MSG_TYPE.INFO, content, options)

    this.#addToast(toast)
  }

  warning = (content, options = {}) => {
    const toast = this.#createToast(MSG_TYPE.WARNING, content, options)

    this.#addToast(toast)
  }

  error = (content, options = {}) => {
    const toast = this.#createToast(MSG_TYPE.ERROR, content, options)

    this.#addToast(toast)
  }

  dismiss = (id) => {
    if (!id) return // No ID no dismiss

    this.#toasts = this.#toasts.filter((item) => item.id !== id)
    this.#onStoreChange(this.#toasts)
  }

  closeAll = () => {
    // Removes all notifications
    this.#toasts.length = 0
    this.#onStoreChange(this.#toasts)
  }

  configure({ autoDismiss, timeOut, single, pauseOnHover, showProgress }) {
    this.#config = {
      ...this.#config,
      autoDismiss,
      timeOut,
      single,
      pauseOnHover,
      showProgress,
    }
  }

  register({ handleStoreChange }) {
    this.#onStoreChange = handleStoreChange
  }
}

export default new Notify()
