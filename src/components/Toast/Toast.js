import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as SuccessIcon } from '../../assets/checked.svg'
import { ReactComponent as InfoIcon } from '../../assets/info.svg'
import { ReactComponent as WarningIcon } from '../../assets/warning.svg'
import { ReactComponent as ErrorIcon } from '../../assets/cancel.svg'

import './Toast.scss'

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
}) {
  let timerID = useRef(null)
  const cls = `ReactNoti__Toast ReactNoti__Toast--${type}`
  const contentCls = `ReactNoti__Toast__body ${!icons ? 'no-icon' : ''}`.trim()
  const typeIconCls = `icon icon-${type}`

  const handleDismiss = () => {
    if (timerID) {
      clearTimeout(timerID)
    }
    onDismiss(id)
  }

  if (autoDismiss && timeOut > 0) {
    timerID = setTimeout(() => {
      onDismiss(id)
    }, timeOut)
  }

  return (
    <div className={cls} data-testid="ReactNoti-Toast">
      {icons && (
        <div
          className="ReactNoti__Toast__type"
          role="img"
          aria-label={`alert ${type}`}
        >
          <span className={typeIconCls}>{iconsMap[type]}</span>
        </div>
      )}

      <div className={contentCls}>
        {title && <strong className="ReactNoti__Toast__title">{title}</strong>}
        <section className="ReactNoti__Toast__content">{content}</section>
      </div>

      <button
        className="ReactNoti__Toast__btn-dismiss"
        type="button"
        onClick={handleDismiss}
        data-testid="btn-dismiss"
      >
        <span className="icon icon-close" />
      </button>
    </div>
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
}

export default Toast
