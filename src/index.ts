import notify from './notify'
import { POSITION, MSG_TYPE } from './utils/constants'
import ReactNoti from './components/ReactNoti'

export { ReactNoti, notify, POSITION, MSG_TYPE }
export type { MsgType, Position } from './utils/constants'
export type {
  ToastType,
  ToastItem,
  ToastOptions,
  NotifyConfig,
  RegisterOptions,
  PromiseMessages,
} from './notify'
export type { NotiClassNames } from './components/Toast'
export type { ReactNotiProps } from './components/ReactNoti'
