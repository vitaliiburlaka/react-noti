export const MSG_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
} as const

export type MsgType = (typeof MSG_TYPE)[keyof typeof MSG_TYPE]
