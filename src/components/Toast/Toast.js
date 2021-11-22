import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import { Timer } from '../../utils/helpers'

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

const iconsMap = {
  success: <SuccessIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
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
}) {
  const timer = useRef()
  const [isRunning, setIsRunning] = useState(autoDismiss)
  // TODO: Remove class names in future versions as those are obsolete now with styled-components
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
          style={{
            animation: `rnShrinkWidth ${timeOut}ms linear`,
            animationPlayState: isRunning ? 'running' : 'paused',
          }}
        />
      )}
    </StyledToast>
  )
}

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]).isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  autoDismiss: PropTypes.bool.isRequired,
  timeOut: PropTypes.number.isRequired,
  icons: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
  pauseOnHover: PropTypes.bool.isRequired,
  showProgress: PropTypes.bool.isRequired,
}

export default Toast
