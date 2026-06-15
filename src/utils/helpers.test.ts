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
  })
})
