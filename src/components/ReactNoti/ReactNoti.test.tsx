import { render, screen, act, fireEvent } from '@testing-library/react'

import ReactNoti from './ReactNoti'
import notify from '../../notify'
import { POSITION, MSG_TYPE } from '../../utils/constants'

describe('<ReactNoti />', () => {
  afterEach(() => {
    act(() => {
      notify.closeAll()
    })
  })

  it('renders without crashing', () => {
    render(<ReactNoti />)
  })

  it('should render notification', () => {
    const { getByText } = render(<ReactNoti />)

    act(() => {
      notify.success(MSG_TYPE.SUCCESS)
    })

    expect(getByText(MSG_TYPE.SUCCESS)).toBeTruthy()
  })

  it('should render single notification in single prop is TRUE', () => {
    const { queryByText } = render(<ReactNoti single />)

    act(() => {
      notify.success(MSG_TYPE.SUCCESS)
      notify.success(MSG_TYPE.INFO)
    })

    expect(queryByText(MSG_TYPE.SUCCESS)).not.toBeTruthy()
  })

  it('should render the newest toast last when position is BOTTOM', () => {
    const { getAllByTestId } = render(
      <ReactNoti position={POSITION.BOTTOM_RIGHT} />
    )

    act(() => {
      notify.success(MSG_TYPE.SUCCESS)
      notify.success(MSG_TYPE.INFO)
    })

    const toasts = getAllByTestId('react-noti-toast')
    const lastToast = toasts[toasts.length - 1]
    expect(lastToast.querySelector('section')?.textContent).toEqual(
      MSG_TYPE.INFO
    )
  })

  it('should honor the per-toast showProgress option over the container prop', () => {
    const { queryByTestId } = render(<ReactNoti showProgress />)

    act(() => {
      notify.success(MSG_TYPE.SUCCESS, { showProgress: false })
    })

    expect(queryByTestId('react-noti-progress')).toBeNull()
  })

  it('should keep a dismissed toast mounted until its exit window finishes', () => {
    vi.useFakeTimers()
    try {
      const { queryByText } = render(<ReactNoti />)
      let id = ''
      act(() => {
        id = notify.success('bye')
      })
      expect(queryByText('bye')).toBeTruthy()

      // Removed from the store, but retained on screen while it animates out.
      act(() => {
        notify.dismiss(id)
      })
      expect(queryByText('bye')).toBeTruthy()

      // After the exit window it is unmounted.
      act(() => {
        vi.advanceTimersByTime(200)
      })
      expect(queryByText('bye')).toBeNull()
    } finally {
      vi.useRealTimers()
    }
  })

  it('should render headless custom content and dismiss via the api', () => {
    vi.useFakeTimers()
    try {
      const { getByText, queryByText } = render(<ReactNoti />)

      act(() => {
        notify.custom(
          ({ dismiss }) => (
            <button type="button" onClick={dismiss}>
              close me
            </button>
          ),
          { autoDismiss: false }
        )
      })
      expect(getByText('close me')).toBeTruthy()

      act(() => {
        fireEvent.click(getByText('close me'))
      })
      act(() => {
        vi.advanceTimersByTime(200)
      })

      expect(queryByText('close me')).toBeNull()
    } finally {
      vi.useRealTimers()
    }
  })

  it('should show at most maxVisible toasts and queue the rest', () => {
    vi.useFakeTimers()
    try {
      const { getByText, queryByText } = render(
        <ReactNoti maxVisible={2} autoDismiss={false} />
      )

      act(() => {
        notify.success('A', { id: 'a' })
        notify.success('B', { id: 'b' })
        notify.success('C', { id: 'c' })
      })

      // The two oldest are shown; the newest waits in the queue.
      expect(getByText('A')).toBeTruthy()
      expect(getByText('B')).toBeTruthy()
      expect(queryByText('C')).toBeNull()

      // Dismissing one frees a slot for the queued toast.
      act(() => {
        notify.dismiss('a')
      })
      expect(getByText('C')).toBeTruthy()

      act(() => {
        vi.advanceTimersByTime(200)
      })
      expect(queryByText('A')).toBeNull()
    } finally {
      vi.useRealTimers()
    }
  })

  it('should render the same toast in every mounted container', () => {
    render(<ReactNoti />)
    render(<ReactNoti />)

    act(() => {
      notify.success('shared')
    })

    expect(screen.getAllByText('shared')).toHaveLength(2)
  })
})
