import notify from './notify'
import { MSG_TYPE, defaultOptions } from './utils/constants'
import { generateUID } from './utils/helpers'

vi.mock('./utils/helpers')

describe('notify before register', () => {
  it('does not throw when called before register()', () => {
    expect(() => notify.success('pre-register')).not.toThrow()
  })
})

describe('notify', () => {
  const handleStoreChangeMockFn = vi.fn()
  const defaultToast = {
    title: '',
    autoDismiss: defaultOptions.autoDismiss,
    timeOut: defaultOptions.timeOut,
    pauseOnHover: defaultOptions.pauseOnHover,
    showProgress: defaultOptions.showProgress,
  }

  beforeAll(() => {
    notify.register({
      handleStoreChange: handleStoreChangeMockFn,
    })
  })

  beforeEach(() => {
    vi.mocked(generateUID).mockImplementation(() => 'aaa-bbb')
    notify.closeAll()
  })
  afterEach(() => {
    handleStoreChangeMockFn.mockClear()
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

  it('should return the generated id from a trigger', () => {
    const id = notify.success('Success')

    expect(id).toBe('aaa-bbb')
  })

  it('should use a caller-supplied id and return it', () => {
    const id = notify.success('Success', { id: 'my-id' })

    expect(id).toBe('my-id')
    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([
      expect.objectContaining({ id: 'my-id' }),
    ])
  })

  it('should allow dismissing a toast by its returned id', () => {
    const id = notify.info('Info', { id: 'info-1' })
    handleStoreChangeMockFn.mockClear()

    notify.dismiss(id)

    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([])
  })

  it('should create a non-dismissing loading toast', () => {
    notify.loading('Loading', { id: 'load-1' })

    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([
      expect.objectContaining({
        id: 'load-1',
        type: MSG_TYPE.LOADING,
        autoDismiss: false,
        showProgress: false,
      }),
    ])
  })

  it('should turn a promise into a loading toast that resolves to success', async () => {
    const promise = Promise.resolve('done')

    notify.promise(promise, {
      loading: 'Loading',
      success: 'Success',
      error: 'Error',
    })

    expect(handleStoreChangeMockFn).toHaveBeenLastCalledWith([
      expect.objectContaining({ type: MSG_TYPE.LOADING, content: 'Loading' }),
    ])

    await promise
    await Promise.resolve()

    const toasts = handleStoreChangeMockFn.mock.calls.at(-1)![0]
    expect(toasts).toHaveLength(1)
    expect(toasts[0]).toEqual(
      expect.objectContaining({ type: MSG_TYPE.SUCCESS, content: 'Success' })
    )
  })

  it('should update the promise toast to error on rejection', async () => {
    const promise = Promise.reject(new Error('boom'))

    await notify
      .promise(promise, {
        loading: 'Loading',
        success: 'Success',
        error: (err) => `Failed: ${(err as Error).message}`,
      })
      .catch(() => {})
    await Promise.resolve()

    const toasts = handleStoreChangeMockFn.mock.calls.at(-1)![0]
    expect(toasts[0]).toEqual(
      expect.objectContaining({
        type: MSG_TYPE.ERROR,
        content: 'Failed: boom',
      })
    )
  })

  it('should update an existing toast in place and return true', () => {
    notify.success('Original', { id: 'up-1' })
    handleStoreChangeMockFn.mockClear()

    const result = notify.update('up-1', 'Updated', { title: 'New' })

    expect(result).toBe(true)
    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([
      expect.objectContaining({
        id: 'up-1',
        type: MSG_TYPE.SUCCESS,
        content: 'Updated',
        title: 'New',
      }),
    ])
  })

  it('should return false and not emit when updating a non-existent toast', () => {
    notify.success('Original', { id: 'up-2' })
    handleStoreChangeMockFn.mockClear()

    const result = notify.update('missing', 'Nope')

    expect(result).toBe(false)
    expect(handleStoreChangeMockFn).not.toHaveBeenCalled()
  })

  it('should replace a toast in place when an id is reused', () => {
    notify.info('First', { id: 'dup' })
    notify.success('Second', { id: 'dup' })

    const lastCall = handleStoreChangeMockFn.mock.calls.at(-1)![0]
    expect(lastCall).toHaveLength(1)
    expect(lastCall[0]).toEqual(
      expect.objectContaining({
        id: 'dup',
        type: MSG_TYPE.SUCCESS,
        content: 'Second',
      })
    )
  })

  it('should remove toast and call handleStoreChange if notify.dismiss() was called with toast ID', () => {
    notify.success('Success')

    notify.dismiss('aaa-bbb')

    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([])
  })

  it('should NOT remove toast if ID does not match any toast', () => {
    notify.success('Success')
    handleStoreChangeMockFn.mockClear()

    notify.dismiss('no-such-id')

    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([
      expect.objectContaining({ id: 'aaa-bbb' }),
    ])
  })

  it('should clear all toasts and call handleStoreChange on notify.closeAll()', () => {
    notify.success('A')
    notify.success('B')
    handleStoreChangeMockFn.mockClear()

    notify.closeAll()

    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([])
  })

  it('should apply configure() options to subsequently created toasts', () => {
    notify.configure({ timeOut: 1000 })

    notify.success('Configured')

    expect(handleStoreChangeMockFn).toHaveBeenCalledWith([
      expect.objectContaining({ timeOut: 1000 }),
    ])

    notify.configure({ timeOut: defaultOptions.timeOut })
  })
})
