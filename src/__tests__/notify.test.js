import notify from '../notify'
import { MSG_TYPE } from '../utils/constants'
import { generateUID } from '../utils/helpers'

jest.mock('../utils/helpers')

describe('notify', () => {
  const handleStoreChangeMockFn = jest.fn()
  const defaultToast = {
    title: undefined,
    type: undefined,
    autoDismiss: true,
    timeOut: 5000,
  }

  beforeAll(() => {
    notify.register({
      handleStoreChange: handleStoreChangeMockFn,
    })
  })

  beforeEach(() => {
    generateUID.mockImplementation(() => 'aaa-bbb')
  })
  afterEach(() => {
    // Dismisses all previous notifications
    notify.dismiss()
  })

  it('should call handleStoreChange with new SUCCESS toast on notify.success() call', () => {
    const newToast = {
      ...defaultToast,
      id: 'aaa-bbb',
      type: MSG_TYPE.SUCCESS,
      content: 'Success',
    }

    notify.success('Success')

    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([newToast])
  })

  it('should call handleStoreChange with new INFO toast on notify.info() call', () => {
    const newToast = {
      ...defaultToast,
      id: 'aaa-bbb',
      type: MSG_TYPE.INFO,
      content: 'Info',
    }

    notify.info('Info')

    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([newToast])
  })

  it('should call handleStoreChange with new WARNING toast on notify.warning() call', () => {
    const newToast = {
      ...defaultToast,
      id: 'aaa-bbb',
      type: MSG_TYPE.WARNING,
      content: 'Warning',
    }

    notify.warning('Warning')

    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([newToast])
  })

  it('should call handleStoreChange with new ERROR toast on notify.error() call', () => {
    const newToast = {
      ...defaultToast,
      id: 'aaa-bbb',
      type: MSG_TYPE.ERROR,
      content: 'Error',
    }

    notify.error('Error')

    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([newToast])
  })
})