import { useEffect, useState } from 'react'

import Toast, { type NotiClassNames } from '../Toast'
import notify, { type ToastItem } from '../../notify'
import { defaultOptions, type Position } from '../../utils/constants'
import { StyledReactNoti, StyledTray } from './ReactNoti.styled'

interface ReactNotiProps {
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

  const handleStoreChange = (newToasts: ToastItem[]) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledReactNoti className={className}>
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
              showProgress={showProgress}
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
