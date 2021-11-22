import React from 'react'
import PropTypes from 'prop-types'
import { POSITION } from '../../../../src/index'

import Checkbox from '../Checkbox'
import { StyledButton } from '../../styled'
import {
  StyledDemoPanel,
  StyledDemoHeader,
  StyledDemoButtons,
  StyledDemoProps,
} from './DemoPanel.styled'

import { MSG_TYPE } from '../../constants'

function DemoPanel({
  position,
  handlePositionChange,
  timeOut,
  handleTimeOutChange,
  handleOnClick,
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
}) {
  return (
    <StyledDemoPanel className="DemoPanel">
      <StyledDemoHeader>
        <h2>react-noti</h2>
        <div>Notifications made easy.</div>
      </StyledDemoHeader>

      <div className="DemoPanel__content">
        <StyledDemoButtons>
          {Object.keys(MSG_TYPE).map((k) => (
            <StyledButton
              key={MSG_TYPE[k]}
              type="button"
              kind={MSG_TYPE[k]}
              onClick={() => handleOnClick(MSG_TYPE[k])}
            >
              {MSG_TYPE[k]}
            </StyledButton>
          ))}
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
                {Object.keys(POSITION).map((k) => (
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
                maxLength="4"
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

DemoPanel.propTypes = {
  position: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  timeOut: PropTypes.number.isRequired,
  icons: PropTypes.bool.isRequired,
  autoDismiss: PropTypes.bool.isRequired,
  isSingle: PropTypes.bool.isRequired,
  pauseOnHover: PropTypes.bool.isRequired,
  showProgress: PropTypes.bool.isRequired,
  handlePositionChange: PropTypes.func.isRequired,
  handleTimeOutChange: PropTypes.func.isRequired,
  handleIconsChange: PropTypes.func.isRequired,
  handleAutoDismissChange: PropTypes.func.isRequired,
  handleIsSingleChange: PropTypes.func.isRequired,
  handlePauseOnHoverChange: PropTypes.func.isRequired,
  handleShowProgressChange: PropTypes.func.isRequired,
}

export default DemoPanel
