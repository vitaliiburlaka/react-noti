/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Toast from './Toast'
import { DEFAULTS } from '../../utils/constants'

jest.useFakeTimers()

describe('<Toast />', () => {
  const defaultProps = {
    id: '12345',
    content: 'Hello',
    type: 'success',
    onDismiss: () => {},
    autoDismiss: DEFAULTS.autoDismiss,
    timeOut: DEFAULTS.timeOut,
    icons: DEFAULTS.icons,
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
    const onDismissMockFn = jest.fn()
    const props = { ...defaultProps, onDismiss: onDismissMockFn }

    const { getByTestId } = render(<Toast {...props} />)

    fireEvent.click(getByTestId('btn-dismiss'))

    jest.runOnlyPendingTimers()

    expect(onDismissMockFn).toHaveBeenCalledWith(props.id)
  })

  it('should call onDismiss() after timeout if autoDismiss if TRUE', () => {
    const onDismissMockFn = jest.fn()
    const props = { ...defaultProps, onDismiss: onDismissMockFn }

    render(<Toast {...props} />)

    jest.runOnlyPendingTimers()

    expect(onDismissMockFn).toHaveBeenCalledWith(props.id)
  })

  it('should NOT call onDismiss() after timeout if autoDismiss if FALSE', () => {
    const onDismissMockFn = jest.fn()
    const props = {
      ...defaultProps,
      onDismiss: onDismissMockFn,
      autoDismiss: false,
    }

    render(<Toast {...props} />)

    jest.runOnlyPendingTimers()

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
})
