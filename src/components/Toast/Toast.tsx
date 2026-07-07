import {
  useEffect,
  useState,
  useRef,
  memo,
  type ReactNode,
  type ReactElement,
} from 'react'

import { Timer, prefersReducedMotion } from '../../utils/helpers'
import { TOAST_EXIT_MS, type MsgType } from '../../utils/constants'
import type { ToastRender } from '../../notify'

import SuccessIcon from '../../assets/checked.svg?react'
import InfoIcon from '../../assets/info.svg?react'
import WarningIcon from '../../assets/warning.svg?react'
import ErrorIcon from '../../assets/cancel.svg?react'
import CloseIcon from '../../assets/close-16.svg?react'

import {
  StyledToast,
  StyledType,
  StyledBody,
  StyledIcon,
  StyledBtnDismiss,
  StyledProgress,
  StyledSpinner,
} from './Toast.styled'

const iconsMap: Record<MsgType, ReactElement> = {
  success: <SuccessIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
  loading: <StyledSpinner data-testid="react-noti-spinner" />,
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
  isLeaving: boolean
  onExited: (id: string) => void
  icons: boolean
  pauseOnHover: boolean
  showProgress: boolean
  render?: ToastRender
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
  isLeaving,
  onExited,
  icons,
  pauseOnHover,
  showProgress,
  render,
  classNames = {},
}: ToastProps) {
  const timer = useRef<Timer | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const handleDismiss = () => {
    onDismiss(id)
  }

  // (Re)start the auto-dismiss timer whenever the timing props change — this
  // is what lets an in-place update (e.g. loading -> success) begin dismissing.
  // Skip once the toast is leaving so it isn't dismissed twice.
  useEffect(() => {
    if (isLeaving || !autoDismiss || timeOut <= 0) {
      setIsRunning(false)
      return undefined
    }

    timer.current = new Timer(() => onDismiss(id), timeOut)
    setIsRunning(true)

    return () => {
      timer.current?.clear()
      timer.current = null
    }
  }, [autoDismiss, timeOut, id, onDismiss, isLeaving])

  // Once removed from the store the toast is retained to play its exit
  // animation; drop it after the animation window (immediately if the user
  // prefers reduced motion).
  useEffect(() => {
    if (!isLeaving) return undefined

    timer.current?.clear()
    const delay = prefersReducedMotion() ? 0 : TOAST_EXIT_MS
    const timeoutId = window.setTimeout(() => onExited(id), delay)

    return () => window.clearTimeout(timeoutId)
  }, [isLeaving, id, onExited])

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

  // Headless toast: the caller's render controls everything inside the slot.
  if (render) {
    return (
      <StyledToast
        className={classNames.toast}
        data-testid="react-noti-toast"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        isLeaving={isLeaving}
        headless
      >
        {render({ id, dismiss: handleDismiss })}
      </StyledToast>
    )
  }

  return (
    <StyledToast
      className={classNames.toast}
      data-testid="react-noti-toast"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type={type}
      isLeaving={isLeaving}
    >
      {icons && (
        <StyledType role="img" aria-label={`alert ${type}`}>
          <StyledIcon aria-hidden="true">{iconsMap[type]}</StyledIcon>
        </StyledType>
      )}

      <StyledBody className={classNames.body} icons={icons}>
        {title && <strong className={classNames.title}>{title}</strong>}
        <section className={classNames.content}>{content}</section>
      </StyledBody>

      <StyledBtnDismiss
        className={classNames.dismiss}
        type="button"
        aria-label="Dismiss notification"
        onClick={handleDismiss}
        data-testid="react-noti-dismiss"
      >
        <StyledIcon aria-hidden="true">
          <CloseIcon />
        </StyledIcon>
      </StyledBtnDismiss>

      {autoDismiss && showProgress === true && (
        <StyledProgress
          className={classNames.progress}
          data-testid="react-noti-progress"
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
