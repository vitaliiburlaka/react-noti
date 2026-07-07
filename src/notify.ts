import { type ReactNode } from 'react'

import { MSG_TYPE, defaultOptions, type MsgType } from './utils/constants'
import { generateUID } from './utils/helpers'

// Kept as an alias for the previously exported name; prefer MsgType going forward.
export type ToastType = MsgType

export interface ToastOptions {
  /** Supply your own id to target this toast later (e.g. dismiss or update). */
  id?: string
  title?: string
  autoDismiss?: boolean
  timeOut?: number
  pauseOnHover?: boolean
  showProgress?: boolean
}

/** Handle passed to a custom render function. */
export interface ToastRenderApi {
  id: string
  dismiss: () => void
}

/** Renders fully custom (headless) toast content. */
export type ToastRender = (api: ToastRenderApi) => ReactNode

export interface ToastItem extends Required<ToastOptions> {
  id: string
  type: MsgType
  content: ReactNode
  /** When set, the toast is headless: this replaces all default chrome. */
  render?: ToastRender
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

/** A message that is either static content or derived from the resolved value. */
type PromiseMessage<T> = ReactNode | ((value: T) => ReactNode)

export interface PromiseMessages<T> {
  loading: ReactNode
  success: PromiseMessage<T>
  error: PromiseMessage<unknown>
}

function resolveMessage<T>(message: PromiseMessage<T>, value: T): ReactNode {
  return typeof message === 'function' ? message(value) : message
}

// Stable reference for the server snapshot (useSyncExternalStore requires it).
const EMPTY_TOASTS: ToastItem[] = []

class Notify {
  private toasts: ToastItem[] = []

  private config: NotifyConfig = {
    autoDismiss: defaultOptions.autoDismiss,
    timeOut: defaultOptions.timeOut,
    single: defaultOptions.single,
    pauseOnHover: defaultOptions.pauseOnHover,
    showProgress: defaultOptions.showProgress,
  }

  private listeners = new Set<() => void>()

  // A single legacy subscription backing the deprecated register() API.
  private legacyUnsubscribe: (() => void) | null = null

  private emit() {
    this.listeners.forEach((listener) => listener())
  }

  private createToast(
    type: MsgType,
    content: ReactNode,
    options: ToastOptions = {}
  ): ToastItem {
    const {
      id = generateUID(),
      title = '',
      autoDismiss = this.config.autoDismiss,
      timeOut = this.config.timeOut,
      pauseOnHover = this.config.pauseOnHover,
      showProgress = this.config.showProgress,
    } = options
    return {
      id,
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
      this.toasts = [toast]
    } else {
      const index = this.toasts.findIndex((t) => t.id === toast.id)
      this.toasts =
        index === -1
          ? [toast, ...this.toasts]
          : // Re-using an existing id replaces that toast in place.
            this.toasts.map((t, i) => (i === index ? toast : t))
    }
    this.emit()
  }

  success = (content: ReactNode, options: ToastOptions = {}): string => {
    const toast = this.createToast(MSG_TYPE.SUCCESS, content, options)
    this.addToast(toast)
    return toast.id
  }

  info = (content: ReactNode, options: ToastOptions = {}): string => {
    const toast = this.createToast(MSG_TYPE.INFO, content, options)
    this.addToast(toast)
    return toast.id
  }

  warning = (content: ReactNode, options: ToastOptions = {}): string => {
    const toast = this.createToast(MSG_TYPE.WARNING, content, options)
    this.addToast(toast)
    return toast.id
  }

  error = (content: ReactNode, options: ToastOptions = {}): string => {
    const toast = this.createToast(MSG_TYPE.ERROR, content, options)
    this.addToast(toast)
    return toast.id
  }

  loading = (content: ReactNode, options: ToastOptions = {}): string => {
    // Loading toasts are pending by default: no auto-dismiss, no progress bar.
    const toast = this.createToast(MSG_TYPE.LOADING, content, {
      autoDismiss: false,
      showProgress: false,
      ...options,
    })
    this.addToast(toast)
    return toast.id
  }

  /**
   * Show a loading toast that resolves to a success or error toast in place.
   * Returns the original promise so callers can still await/chain it.
   */
  promise = <T>(
    promise: Promise<T>,
    messages: PromiseMessages<T>,
    options: Omit<ToastOptions, 'id'> = {}
  ): Promise<T> => {
    const id = this.loading(messages.loading, options)

    promise.then(
      (value) => {
        this.success(resolveMessage(messages.success, value), {
          ...options,
          id,
        })
      },
      (error: unknown) => {
        this.error(resolveMessage(messages.error, error), { ...options, id })
      }
    )

    return promise
  }

  /**
   * Show a headless toast whose content is fully controlled by `render`, which
   * receives the toast id and a `dismiss` callback. No icon, title, progress
   * bar, or default dismiss button is rendered.
   */
  custom = (render: ToastRender, options: ToastOptions = {}): string => {
    const {
      id = generateUID(),
      autoDismiss = this.config.autoDismiss,
      timeOut = this.config.timeOut,
      pauseOnHover = this.config.pauseOnHover,
    } = options
    const toast: ToastItem = {
      id,
      type: MSG_TYPE.INFO, // unused: custom render bypasses type-based chrome
      content: null,
      title: '',
      autoDismiss,
      timeOut,
      pauseOnHover,
      showProgress: false,
      render,
    }
    this.addToast(toast)
    return id
  }

  /**
   * Update an existing toast in place, preserving its type and position.
   * Returns `true` if a toast with the given id was found, otherwise `false`.
   */
  update = (
    id: string,
    content: ReactNode,
    options: Omit<ToastOptions, 'id'> = {}
  ): boolean => {
    const index = this.toasts.findIndex((t) => t.id === id)
    if (index === -1) return false

    const prev = this.toasts[index]
    const next: ToastItem = {
      ...prev,
      content,
      title: options.title ?? prev.title,
      autoDismiss: options.autoDismiss ?? prev.autoDismiss,
      timeOut: options.timeOut ?? prev.timeOut,
      pauseOnHover: options.pauseOnHover ?? prev.pauseOnHover,
      showProgress: options.showProgress ?? prev.showProgress,
    }
    this.toasts = this.toasts.map((t, i) => (i === index ? next : t))
    this.emit()
    return true
  }

  dismiss = (id: string) => {
    this.toasts = this.toasts.filter((item) => item.id !== id)
    this.emit()
  }

  closeAll = () => {
    this.toasts = []
    this.emit()
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

  /**
   * Subscribe to store changes. Returns an unsubscribe function.
   * Designed for React's `useSyncExternalStore`, but usable standalone.
   */
  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => {
      this.listeners.delete(listener)
    }
  }

  /** Current toast list. Reference changes only when the store changes. */
  getSnapshot = (): ToastItem[] => this.toasts

  /** Server render always starts empty — toasts are ephemeral client state. */
  getServerSnapshot = (): ToastItem[] => EMPTY_TOASTS

  /**
   * @deprecated Use `subscribe` + `getSnapshot` (via `useSyncExternalStore`)
   * instead. Kept for backward compatibility; supports a single listener.
   */
  register = ({ handleStoreChange }: RegisterOptions) => {
    if (this.legacyUnsubscribe) this.legacyUnsubscribe()
    this.legacyUnsubscribe = this.subscribe(() =>
      handleStoreChange(this.getSnapshot())
    )
    handleStoreChange(this.getSnapshot())
  }
}

export default new Notify()
