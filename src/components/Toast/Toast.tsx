import {
  useEffect,
  useState,
  useRef,
  memo,
  type ReactNode,
  type ReactElement,
} from 'react'

import { Timer } from '../../utils/helpers'
import type { MsgType } from '../../utils/constants'

import SuccessIcon from '../../assets/checked.svg?react'
import InfoIcon from '../../assets/info.svg?react'
import WarningIcon from '../../assets/warning.svg?react'
import ErrorIcon from '../../assets/cancel.svg?react'

import {
  StyledToast,
  StyledType,
  StyledBody,
  StyledIcon,
  StyledBtnDismiss,
  StyledProgress,
} from './Toast.styled'

const iconsMap: Record<MsgType, ReactElement> = {
  success: <SuccessIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
}

export interface NotiClassNames {
  toast?: string
  body?: string
  title?: string
  content?: string
  dismiss?: string
  progress?: string
}

interface ToastProps {
  id: string
  content: ReactNode
  title?: string
  type: MsgType
  autoDismiss: boolean
  timeOut: number
  onDismiss: (id: string) => void
  icons: boolean
  pauseOnHover: boolean
  showProgress: boolean
  classNames?: NotiClassNames
}

function Toast({
  id,
  content,
  title,
  type,
  autoDismiss,
  timeOut,
  onDismiss,
  icons,
  pauseOnHover,
  showProgress,
  classNames = {},
}: ToastProps) {
  const timer = useRef<Timer | null>(null)
  const [isRunning, setIsRunning] = useState(autoDismiss)

  const handleDismiss = () => {
    onDismiss(id)
  }

  const startTimer = () => {
    if (!autoDismiss || timeOut <= 0) return

    timer.current = new Timer(handleDismiss, timeOut)
    setIsRunning(true)
  }

  const clearTimer = () => {
    if (timer.current) timer.current.clear()
  }

  useEffect(() => {
    startTimer()

    return () => {
      clearTimer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onMouseEnter = () => {
    if (!pauseOnHover || !timer.current) return
    timer.current.pause()
    setIsRunning(false)
  }

  const onMouseLeave = () => {
    if (!pauseOnHover || !timer.current) return
    timer.current.resume()
    setIsRunning(true)
  }

  return (
    <StyledToast
      className={classNames.toast}
      data-testid="ReactNoti-Toast"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type={type}
    >
      {icons && (
        <StyledType role="img" aria-label={`alert ${type}`}>
          <StyledIcon>{iconsMap[type]}</StyledIcon>
        </StyledType>
      )}

      <StyledBody className={classNames.body} icons={icons}>
        {title && <strong className={classNames.title}>{title}</strong>}
        <section className={classNames.content}>{content}</section>
      </StyledBody>

      <StyledBtnDismiss
        className={classNames.dismiss}
        type="button"
        onClick={handleDismiss}
        data-testid="btn-dismiss"
      >
        <StyledIcon />
      </StyledBtnDismiss>

      {autoDismiss && showProgress === true && (
        <StyledProgress
          className={classNames.progress}
          data-testid="ReactNoti-Toast-progress"
          kind={type}
          duration={timeOut}
          style={{
            animationPlayState: isRunning ? 'running' : 'paused',
          }}
        />
      )}
    </StyledToast>
  )
}

export default memo(Toast)
