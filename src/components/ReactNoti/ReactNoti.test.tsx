import React from 'react'
import { render, act } from '@testing-library/react'

import ReactNoti from './ReactNoti'
import notify from '../../notify'
import { POSITION, MSG_TYPE } from '../../utils/constants'

describe('<ReactNoti />', () => {
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

  it('should render notification in reverse order if position is BOTTOM', () => {
    const { getAllByTestId } = render(
      <ReactNoti position={POSITION.BOTTOM_RIGHT} />
    )

    act(() => {
      notify.success(MSG_TYPE.SUCCESS)
      notify.success(MSG_TYPE.INFO)
    })

    const [firstToast] = getAllByTestId('ReactNoti-Toast')
    expect(firstToast.querySelector('section').textContent).toEqual(
      MSG_TYPE.INFO
    )
  })
})
