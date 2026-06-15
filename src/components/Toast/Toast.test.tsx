import { render, fireEvent } from '@testing-library/react'

import Toast from './Toast'
import { MSG_TYPE, defaultOptions } from '../../utils/constants'

vi.useFakeTimers()

describe('<Toast />', () => {
  const defaultProps = {
    id: '12345',
    content: 'Hello',
    type: MSG_TYPE.SUCCESS,
    onDismiss: () => {},
    autoDismiss: defaultOptions.autoDismiss,
    timeOut: defaultOptions.timeOut,
    icons: defaultOptions.icons,
    pauseOnHover: defaultOptions.pauseOnHover,
    showProgress: defaultOptions.showProgress,
  }

  it('renders without crashing', () => {
    render(<Toast {...defaultProps} />)
  })

  it('should render title if `title` prop is defined', () => {
    const props = { ...defaultProps, title: 'Title' }

    const { getByText } = render(<Toast {...props} />)

    expect(getByText(props.title)).toBeTruthy()
  })

  it('should call onDismiss() on button Dismiss click', () => {
    const onDismissMockFn = vi.fn()
    const props = { ...defaultProps, onDismiss: onDismissMockFn }

    const { getByTestId } = render(<Toast {...props} />)

    fireEvent.click(getByTestId('react-noti-dismiss'))

    vi.runOnlyPendingTimers()

    expect(onDismissMockFn).toHaveBeenCalledWith(props.id)
  })

  it('should call onDismiss() after timeout if autoDismiss if TRUE', () => {
    const onDismissMockFn = vi.fn()
    const props = { ...defaultProps, onDismiss: onDismissMockFn }

    render(<Toast {...props} />)

    vi.runOnlyPendingTimers()

    expect(onDismissMockFn).toHaveBeenCalledWith(props.id)
  })

  it('should NOT call onDismiss() after timeout if autoDismiss if FALSE', () => {
    const onDismissMockFn = vi.fn()
    const props = {
      ...defaultProps,
      onDismiss: onDismissMockFn,
      autoDismiss: false,
    }

    render(<Toast {...props} />)

    vi.runOnlyPendingTimers()

    expect(onDismissMockFn).not.toHaveBeenCalled()
  })

  it('should NOT show the icons if icons prop if FALSE', () => {
    const props = {
      ...defaultProps,
      icons: false,
    }

    const { queryByRole } = render(<Toast {...props} />)

    expect(queryByRole('img')).toBeNull()
  })

  it('should show progress bar if showProgress prop set to TRUE', () => {
    const props = {
      ...defaultProps,
      showProgress: true,
    }

    const { getByTestId } = render(<Toast {...props} />)

    expect(getByTestId('react-noti-progress')).toBeInTheDocument()
  })

  it('should not dismiss Toast when mouse hovered on', () => {
    const onDismissMockFn = vi.fn()
    const props = {
      ...defaultProps,
      showProgress: true,
      onDismiss: onDismissMockFn,
    }
    const { getByTestId } = render(<Toast {...props} />)

    fireEvent.mouseEnter(getByTestId('react-noti-toast'))
    vi.runOnlyPendingTimers()

    expect(onDismissMockFn).not.toHaveBeenCalled()
  })

  it('should dismiss Toast when mouse hover off', () => {
    const onDismissMockFn = vi.fn()
    const props = {
      ...defaultProps,
      showProgress: true,
      onDismiss: onDismissMockFn,
    }
    const { getByTestId } = render(<Toast {...props} />)

    fireEvent.mouseEnter(getByTestId('react-noti-toast'))
    vi.runOnlyPendingTimers()
    fireEvent.mouseLeave(getByTestId('react-noti-toast'))
    vi.runOnlyPendingTimers()

    expect(onDismissMockFn).toHaveBeenCalled()
  })

  it('should dismiss Toast when mouse hovered if pauseOnHover is FALSE', () => {
    const onDismissMockFn = vi.fn()
    const props = {
      ...defaultProps,
      pauseOnHover: false,
      onDismiss: onDismissMockFn,
    }
    const { getByTestId } = render(<Toast {...props} />)

    fireEvent.mouseEnter(getByTestId('react-noti-toast'))
    vi.runOnlyPendingTimers()
    fireEvent.mouseLeave(getByTestId('react-noti-toast'))
    vi.runOnlyPendingTimers()

    expect(onDismissMockFn).toHaveBeenCalled()
  })
})
