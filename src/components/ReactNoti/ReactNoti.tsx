import { useEffect, useMemo, useSyncExternalStore } from 'react'

import Toast, { type NotiClassNames } from '../Toast'
import notify from '../../notify'
import { defaultOptions, type Position } from '../../utils/constants'
import { StyledReactNoti, StyledTray } from './ReactNoti.styled'

export interface ReactNotiProps {
  position?: Position
  autoDismiss?: boolean
  timeOut?: number
  single?: boolean
  icons?: boolean
  pauseOnHover?: boolean
  showProgress?: boolean
  className?: string
  classNames?: NotiClassNames
}

export function ReactNoti({
  position = defaultOptions.position,
  autoDismiss = defaultOptions.autoDismiss,
  timeOut = defaultOptions.timeOut,
  single = defaultOptions.single,
  icons = defaultOptions.icons,
  pauseOnHover = defaultOptions.pauseOnHover,
  showProgress = defaultOptions.showProgress,
  className,
  classNames,
}: ReactNotiProps) {
  const toasts = useSyncExternalStore(
    notify.subscribe,
    notify.getSnapshot,
    notify.getServerSnapshot
  )

  // Bottom positions render newest-last so it sits closest to the screen edge.
  const orderedToasts = useMemo(() => {
    const [pos] = position.split('-')
    return pos === 'bottom' ? [...toasts].reverse() : toasts
  }, [toasts, position])

  useEffect(() => {
    notify.configure({
      autoDismiss,
      timeOut,
      single,
      pauseOnHover,
      showProgress,
    })
  }, [autoDismiss, timeOut, single, pauseOnHover, showProgress])

  return (
    <StyledReactNoti
      className={className}
      aria-live="polite"
      aria-atomic="false"
    >
      {orderedToasts.length > 0 && (
        <StyledTray position={position}>
          {orderedToasts.map((t) => (
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
              showProgress={t.showProgress}
              onDismiss={notify.dismiss}
              classNames={classNames}
            />
          ))}
        </StyledTray>
      )}
    </StyledReactNoti>
  )
}

export default ReactNoti
