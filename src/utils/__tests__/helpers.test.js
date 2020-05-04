import { generateUID } from '../helpers'

describe('helpers', () => {
  describe('generateUID()', () => {
    it('should generate unique ID', () => {
      const firstID = generateUID()
      const secondID = generateUID()

      expect(firstID).not.toEqual(secondID)
    })
  })
})
