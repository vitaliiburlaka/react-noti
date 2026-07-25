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
  maxVisible: 0, // 0 = unlimited
} as const

// Duration of the toast exit animation (ms). Kept in sync with the `rnLeave`
// animation in Toast.styled.ts; the toast unmounts after this delay.
export const TOAST_EXIT_MS = 200
