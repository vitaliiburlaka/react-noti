import { generateUID, Timer } from '../helpers'

describe('helpers', () => {
  describe('generateUID()', () => {
    it('should generate unique ID', () => {
      const firstID = generateUID()
      const secondID = generateUID()

      expect(firstID).not.toEqual(secondID)
    })
  })

  describe('Timer', () => {
    jest.useFakeTimers()

    it('should call setTimeout with passed callback on init', () => {
      const spy = jest.spyOn(window, 'setTimeout')
      const callbackMockFn = jest.fn()

      // eslint-disable-next-line no-unused-vars
      const timer = new Timer(callbackMockFn, 3000)
      jest.runOnlyPendingTimers()

      expect(spy).toHaveBeenCalled()
      expect(callbackMockFn).toHaveBeenCalledWith()

      spy.mockClear()
    })

    it('should call clearTimeout on timer.pause()', () => {
      const spy = jest.spyOn(window, 'clearTimeout')
      const timer = new Timer(() => {}, 3000)

      timer.pause()
      jest.runOnlyPendingTimers()

      expect(spy).toHaveBeenCalled()

      spy.mockClear()
    })

    it('should call clearTimeout on timer.clear()', () => {
      const spy = jest.spyOn(window, 'clearTimeout')
      const timer = new Timer(() => {}, 3000)

      timer.clear()

      expect(spy).toHaveBeenCalled()

      spy.mockClear()
    })
  })
})
