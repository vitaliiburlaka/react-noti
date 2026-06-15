import { generateUID, Timer } from './helpers'

describe('helpers', () => {
  describe('generateUID()', () => {
    it('should generate unique ID', () => {
      const firstID = generateUID()
      const secondID = generateUID()

      expect(firstID).not.toEqual(secondID)
    })
  })

  describe('Timer', () => {
    vi.useFakeTimers()

    it('should call setTimeout with passed callback on init', () => {
      const spy = vi.spyOn(window, 'setTimeout')
      const callbackMockFn = vi.fn()

      new Timer(callbackMockFn, 3000)
      vi.runOnlyPendingTimers()

      expect(spy).toHaveBeenCalled()
      expect(callbackMockFn).toHaveBeenCalledWith()

      spy.mockClear()
    })

    it('should call clearTimeout on timer.pause()', () => {
      const spy = vi.spyOn(window, 'clearTimeout')
      const timer = new Timer(() => {}, 3000)

      timer.pause()
      vi.runOnlyPendingTimers()

      expect(spy).toHaveBeenCalled()

      spy.mockClear()
    })

    it('should call clearTimeout on timer.clear()', () => {
      const spy = vi.spyOn(window, 'clearTimeout')
      const timer = new Timer(() => {}, 3000)

      timer.clear()

      expect(spy).toHaveBeenCalled()

      spy.mockClear()
    })

    it('should resume with remaining time after pause', () => {
      const callbackMockFn = vi.fn()
      const setTimeoutSpy = vi.spyOn(window, 'setTimeout')
      const timer = new Timer(callbackMockFn, 3000)

      vi.advanceTimersByTime(1000)
      timer.pause()
      timer.resume()

      const lastCall = setTimeoutSpy.mock.calls.at(-1)!
      expect(lastCall[1]).toBeLessThanOrEqual(2000)
      expect(lastCall[1]).toBeGreaterThan(0)

      setTimeoutSpy.mockClear()
    })

    it('should not produce negative remainingTime if pause() is called twice', () => {
      const callbackMockFn = vi.fn()
      const timer = new Timer(callbackMockFn, 100)

      vi.advanceTimersByTime(60)
      timer.pause()
      vi.advanceTimersByTime(60)
      timer.pause()
      timer.resume()

      vi.runOnlyPendingTimers()

      // callback should fire (remainingTime clamped to 0, not negative)
      expect(callbackMockFn).toHaveBeenCalled()
    })
  })
})
