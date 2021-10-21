import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Toast from '../Toast'
import notify from '../../notify'
import { POSITION, defaultOptions } from '../../utils/constants'
import { StyledReactNoti, StyledTray } from './ReactNoti.styled'

function ReactNoti({
  position = defaultOptions.position,
  autoDismiss = defaultOptions.autoDismiss,
  timeOut = defaultOptions.timeOut,
  single = defaultOptions.single,
  icons = defaultOptions.icons,
  pauseOnHover = defaultOptions.pauseOnHover,
  showProgress = defaultOptions.showProgress,
  className,
}) {
  const [toasts, setToasts] = useState([])
  // TODO: Remove class names in future versions as those are obsolete now with styled-components
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
    <StyledReactNoti className={cls}>
      {toasts.length > 0 && (
        <StyledTray className={trayCls} position={position}>
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
        </StyledTray>
      )}
    </StyledReactNoti>
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
