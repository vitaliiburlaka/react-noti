import {
  useEffect,
  useState,
  useRef,
  type ReactNode,
  type ReactElement,
} from 'react'

import { Timer } from '../../utils/helpers'
import type { MsgType } from '../../utils/constants'

import { ReactComponent as SuccessIcon } from '../../assets/checked.svg'
import { ReactComponent as InfoIcon } from '../../assets/info.svg'
import { ReactComponent as WarningIcon } from '../../assets/warning.svg'
import { ReactComponent as ErrorIcon } from '../../assets/cancel.svg'

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
}: ToastProps) {
  const timer = useRef<Timer | null>(null)
  const [isRunning, setIsRunning] = useState(autoDismiss)
  // TODO: Remove class names in a future major; obsolete now that styles come from emotion.
  const cls = `ReactNoti__Toast ReactNoti__Toast--${type}`
  const bodyCls = `ReactNoti__Toast__body ${!icons ? 'no-icon' : ''}`.trim()
  const typeIconCls = `RN-icon icon-${type}`
  const progressCls = `ReactNoti__Toast__progress ReactNoti__Toast__progress--${type}`

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
      className={cls}
      data-testid="ReactNoti-Toast"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type={type}
    >
      {icons && (
        <StyledType
          className="ReactNoti__Toast__type"
          role="img"
          aria-label={`alert ${type}`}
        >
          <StyledIcon className={typeIconCls}>{iconsMap[type]}</StyledIcon>
        </StyledType>
      )}

      <StyledBody className={bodyCls} icons={icons}>
        {title && <strong className="ReactNoti__Toast__title">{title}</strong>}
        <section className="ReactNoti__Toast__content">{content}</section>
      </StyledBody>

      <StyledBtnDismiss
        className="ReactNoti__Toast__btn-dismiss"
        type="button"
        onClick={handleDismiss}
        data-testid="btn-dismiss"
      >
        <StyledIcon className="RN-icon icon-close" />
      </StyledBtnDismiss>

      {autoDismiss && showProgress === true && (
        <StyledProgress
          className={progressCls}
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

export default Toast
