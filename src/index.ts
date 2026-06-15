import notify from './notify'
import { POSITION } from './utils/constants'
import ReactNoti from './components/ReactNoti'

export { ReactNoti, notify, POSITION }
export type { MsgType, Position } from './utils/constants'
export type {
  ToastType,
  ToastItem,
  ToastOptions,
  NotifyConfig,
  RegisterOptions,
} from './notify'
