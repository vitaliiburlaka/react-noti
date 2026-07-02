import { useCallback, useEffect, useState } from 'react'

import Toast, { type NotiClassNames } from '../Toast'
import notify, { type ToastItem } from '../../notify'
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
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const handleStoreChange = useCallback(
    (newToasts: ToastItem[]) => {
      const [pos] = position.split('-')
      const nextToasts =
        pos === 'bottom' ? [...newToasts].reverse() : [...newToasts]

      setToasts(nextToasts)
    },
    [position]
  )

  useEffect(() => {
    notify.configure({
      autoDismiss,
      timeOut,
      single,
      pauseOnHover,
      showProgress,
    })
  }, [autoDismiss, timeOut, single, pauseOnHover, showProgress])

  useEffect(() => {
    notify.register({ handleStoreChange })
  }, [handleStoreChange])

  return (
    <StyledReactNoti
      className={className}
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.length > 0 && (
        <StyledTray position={position}>
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
