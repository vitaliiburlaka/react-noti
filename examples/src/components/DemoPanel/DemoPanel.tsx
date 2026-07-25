import type { ChangeEvent } from 'react'
import { POSITION, type Position } from '../../../../src/index'

import Checkbox from '../Checkbox'
import { StyledButton } from '../../styled'
import {
  StyledDemoPanel,
  StyledDemoHeader,
  StyledDemoButtons,
  StyledDemoProps,
} from './DemoPanel.styled'

import { MSG_TYPE, type MsgType } from '../../constants'

interface DemoPanelProps {
  position: Position
  handlePositionChange: (event: ChangeEvent<HTMLSelectElement>) => void
  timeOut: number
  handleTimeOutChange: (event: ChangeEvent<HTMLInputElement>) => void
  maxVisible: number
  handleMaxVisibleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleOnClick: (type: MsgType) => void
  handlePromiseClick: () => void
  handleCustomClick: () => void
  autoDismiss: boolean
  handleAutoDismissChange: () => void
  icons: boolean
  handleIconsChange: () => void
  isSingle: boolean
  handleIsSingleChange: () => void
  showProgress: boolean
  handleShowProgressChange: () => void
  pauseOnHover: boolean
  handlePauseOnHoverChange: () => void
}

function DemoPanel({
  position,
  handlePositionChange,
  timeOut,
  handleTimeOutChange,
  maxVisible,
  handleMaxVisibleChange,
  handleOnClick,
  handlePromiseClick,
  handleCustomClick,
  autoDismiss,
  handleAutoDismissChange,
  icons,
  handleIconsChange,
  isSingle,
  handleIsSingleChange,
  showProgress,
  handleShowProgressChange,
  pauseOnHover,
  handlePauseOnHoverChange,
}: DemoPanelProps) {
  const msgTypeKeys = Object.keys(MSG_TYPE) as Array<keyof typeof MSG_TYPE>
  const positionKeys = Object.keys(POSITION) as Array<keyof typeof POSITION>

  return (
    <StyledDemoPanel className="DemoPanel">
      <StyledDemoHeader>
        <h2>react-noti</h2>
        <div>Notifications made easy.</div>
      </StyledDemoHeader>

      <div className="DemoPanel__content">
        <StyledDemoButtons>
          {msgTypeKeys.map((k) => (
            <StyledButton
              key={MSG_TYPE[k]}
              type="button"
              kind={MSG_TYPE[k]}
              onClick={() => handleOnClick(MSG_TYPE[k])}
            >
              {MSG_TYPE[k]}
            </StyledButton>
          ))}
          <StyledButton
            type="button"
            kind={MSG_TYPE.INFO}
            onClick={handlePromiseClick}
          >
            promise
          </StyledButton>
          <StyledButton
            type="button"
            kind={MSG_TYPE.SUCCESS}
            onClick={handleCustomClick}
          >
            custom
          </StyledButton>
        </StyledDemoButtons>

        <StyledDemoProps>
          <h3>Props</h3>
          <section>
            <label htmlFor="position">
              <code>position</code>{' '}
              <select
                id="position"
                value={position}
                onChange={handlePositionChange}
              >
                {positionKeys.map((k) => (
                  <option key={POSITION[k]} value={POSITION[k]}>
                    {POSITION[k]}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="timeOut">
              <code>timeOut</code>{' '}
              <input
                id="timeOut"
                type="text"
                name="timeOut"
                value={timeOut}
                placeholder="Enter timeOut"
                onChange={handleTimeOutChange}
                maxLength={4}
              />
            </label>
            <label htmlFor="maxVisible">
              <code>maxVisible</code>{' '}
              <input
                id="maxVisible"
                type="text"
                name="maxVisible"
                value={maxVisible}
                placeholder="0 = ∞"
                onChange={handleMaxVisibleChange}
                maxLength={2}
              />
            </label>
          </section>

          <section>
            <label htmlFor="autoDismiss">
              <Checkbox
                id="autoDismiss"
                name="autoDismiss"
                checked={autoDismiss}
                onChange={handleAutoDismissChange}
              />{' '}
              <code>autoDismiss</code>
            </label>

            <label htmlFor="icons">
              <Checkbox
                id="icons"
                name="icons"
                checked={icons}
                onChange={handleIconsChange}
              />{' '}
              <code>icons</code>
            </label>

            <label htmlFor="single">
              <Checkbox
                id="single"
                name="single"
                checked={isSingle}
                onChange={handleIsSingleChange}
              />{' '}
              <code>single</code>
            </label>
          </section>
          <section>
            <label htmlFor="pauseOnHover">
              <Checkbox
                id="pauseOnHover"
                name="pauseOnHover"
                checked={pauseOnHover}
                onChange={handlePauseOnHoverChange}
              />{' '}
              <code>pauseOnHover</code>
            </label>

            <label htmlFor="showProgress">
              <Checkbox
                id="showProgress"
                name="showProgress"
                checked={showProgress}
                onChange={handleShowProgressChange}
              />{' '}
              <code>showProgress</code>
            </label>
          </section>
        </StyledDemoProps>
      </div>
    </StyledDemoPanel>
  )
}

export default DemoPanel
