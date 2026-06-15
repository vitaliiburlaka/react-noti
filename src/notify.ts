import { MSG_TYPE, defaultOptions, type MsgType } from './utils/constants'
import { generateUID } from './utils/helpers'

// Kept as an alias for the previously exported name; prefer MsgType going forward.
export type ToastType = MsgType

export interface ToastOptions {
  title?: string
  autoDismiss?: boolean
  timeOut?: number
  pauseOnHover?: boolean
  showProgress?: boolean
}

export interface ToastItem extends Required<ToastOptions> {
  id: string
  type: MsgType
  content: string
}

export interface NotifyConfig {
  autoDismiss: boolean
  timeOut: number
  single: boolean
  pauseOnHover: boolean
  showProgress: boolean
}

export interface RegisterOptions {
  handleStoreChange: (toasts: ToastItem[]) => void
}

class Notify {
  private toasts: ToastItem[] = []

  private config: NotifyConfig = {
    autoDismiss: defaultOptions.autoDismiss,
    timeOut: defaultOptions.timeOut,
    single: defaultOptions.single,
    pauseOnHover: defaultOptions.pauseOnHover,
    showProgress: defaultOptions.showProgress,
  }

  private onStoreChange: (toasts: ToastItem[]) => void = () => {}

  private createToast(
    type: MsgType,
    content: string,
    options: ToastOptions = {}
  ): ToastItem {
    const {
      title = '',
      autoDismiss = this.config.autoDismiss,
      timeOut = this.config.timeOut,
      pauseOnHover = this.config.pauseOnHover,
      showProgress = this.config.showProgress,
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

  private addToast(toast: ToastItem) {
    if (this.config.single) {
      this.toasts.length = 0
      this.toasts.push(toast)
    } else {
      this.toasts.unshift(toast)
    }
    this.onStoreChange(this.toasts)
  }

  success = (content: string, options: ToastOptions = {}) => {
    const toast = this.createToast(MSG_TYPE.SUCCESS, content, options)
    this.addToast(toast)
  }

  info = (content: string, options: ToastOptions = {}) => {
    const toast = this.createToast(MSG_TYPE.INFO, content, options)
    this.addToast(toast)
  }

  warning = (content: string, options: ToastOptions = {}) => {
    const toast = this.createToast(MSG_TYPE.WARNING, content, options)
    this.addToast(toast)
  }

  error = (content: string, options: ToastOptions = {}) => {
    const toast = this.createToast(MSG_TYPE.ERROR, content, options)
    this.addToast(toast)
  }

  dismiss = (id?: string) => {
    if (!id) return
    this.toasts = this.toasts.filter((item) => item.id !== id)
    this.onStoreChange(this.toasts)
  }

  closeAll = () => {
    this.toasts.length = 0
    this.onStoreChange(this.toasts)
  }

  configure({
    autoDismiss,
    timeOut,
    single,
    pauseOnHover,
    showProgress,
  }: Partial<NotifyConfig>) {
    this.config = {
      ...this.config,
      autoDismiss: autoDismiss ?? this.config.autoDismiss,
      timeOut: timeOut ?? this.config.timeOut,
      single: single ?? this.config.single,
      pauseOnHover: pauseOnHover ?? this.config.pauseOnHover,
      showProgress: showProgress ?? this.config.showProgress,
    }
  }

  register({ handleStoreChange }: RegisterOptions) {
    this.onStoreChange = handleStoreChange
  }
}

export default new Notify()
