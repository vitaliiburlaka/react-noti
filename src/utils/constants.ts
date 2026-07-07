export const MSG_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  LOADING: 'loading',
} as const

export type MsgType = (typeof MSG_TYPE)[keyof typeof MSG_TYPE]

export const POSITION = {
  TOP_CENTER: 'top-center',
  TOP_RIGHT: 'top-right',
  TOP_LEFT: 'top-left',
  BOTTOM_CENTER: 'bottom-center',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_LEFT: 'bottom-left',
} as const

export type Position = (typeof POSITION)[keyof typeof POSITION]

export const defaultOptions = {
  position: POSITION.TOP_RIGHT,
  autoDismiss: true,
  timeOut: 5000,
  single: false,
  icons: true,
  pauseOnHover: true,
  showProgress: true,
} as const
