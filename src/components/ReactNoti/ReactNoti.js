import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Toast from '../Toast/Toast'
import notify from '../../notify'
import { POSITION, DEFAULTS } from '../../utils/constants'

import './ReactNoti.scss'

function ReactNoti({
  position = DEFAULTS.position,
  autoDismiss = DEFAULTS.autoDismiss,
  timeOut = DEFAULTS.timeOut,
  single = DEFAULTS.single,
  icons = DEFAULTS.icons,
  pauseOnHover = DEFAULTS.pauseOnHover,
  showProgress = DEFAULTS.showProgress,
  className,
}) {
  const [toasts, setToasts] = useState([])
  const cls = `ReactNoti ${className || ''}`.trim()
  const trayCls = `ReactNoti__Tray ReactNoti__Tray--${position}`

  const handleStoreChange = (newToasts) => {
    const [pos] = position.split('-')
    const nextToasts =
      pos === 'bottom' ? [...newToasts].reverse() : [...newToasts]

    setToasts(nextToasts)
  }

  notify.configure({
    autoDismiss,
    timeOut,
    single,
    pauseOnHover,
    showProgress,
  })

  useEffect(() => {
    notify.register({
      handleStoreChange,
    })
  }, [])

  return (
    <div className={cls}>
      {toasts.length > 0 && (
        <div className={trayCls}>
          {toasts.map((t) => (
            <Toast
              key={t.id}
              id={t.id}
              content={t.content}
              title={t.title}
              type={t.type}
              autoDismiss={t.autoDismiss}
              timeOut={t.timeOut}
              icons={icons}
              pauseOnHover={t.pauseOnHover}
              showProgress={showProgress}
              onDismiss={notify.dismiss}
            />
          ))}
        </div>
      )}
    </div>
  )
}

ReactNoti.propTypes = {
  position: PropTypes.oneOf(Object.values(POSITION)),
  autoDismiss: PropTypes.bool,
  timeOut: PropTypes.number,
  single: PropTypes.bool,
  icons: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  showProgress: PropTypes.bool,
  className: PropTypes.string,
}

export default ReactNoti
