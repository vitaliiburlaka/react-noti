import { useCallback, useEffect, useState } from 'react'

import type { ToastItem } from '../../notify'

export interface RenderedToast extends ToastItem {
  leaving: boolean
}

/**
 * Bridges the synchronous toast store with animated exits. Toasts removed from
 * the store are retained here (marked `leaving`) so they can play their exit
 * animation, then dropped once the animation reports completion via the
 * returned `onExited` callback. The store itself stays purely synchronous.
 */
export function useToastPresence(
  toasts: ToastItem[]
): [RenderedToast[], (id: string) => void] {
  const [rendered, setRendered] = useState<RenderedToast[]>(() =>
    toasts.map((toast) => ({ ...toast, leaving: false }))
  )

  useEffect(() => {
    setRendered((prev) => {
      const storeIds = new Set(toasts.map((toast) => toast.id))
      const merged: RenderedToast[] = toasts.map((toast) => ({
        ...toast,
        leaving: false,
      }))

      // Re-insert toasts that just left the store, marked `leaving`, at
      // (approximately) their previous position so they don't jump while
      // animating out.
      prev.forEach((toast, index) => {
        if (!storeIds.has(toast.id)) {
          merged.splice(Math.min(index, merged.length), 0, {
            ...toast,
            leaving: true,
          })
        }
      })

      return merged
    })
  }, [toasts])

  const onExited = useCallback((id: string) => {
    setRendered((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return [rendered, onExited]
}
