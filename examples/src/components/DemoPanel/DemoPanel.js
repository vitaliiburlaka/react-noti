import React from 'react'
import PropTypes from 'prop-types'
import { POSITION } from '../../../../src/index'

import { StyledButton, StyledCheckbox } from '../../styled'
import { StyledDemoPanel } from './DemoPanel.styled'

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
      <div className="DemoPanel__header">
        <h2 className="react-noti">react-noti</h2>
        <div className="big-text">Notifications made easy.</div>
      </div>

      <div className="DemoPanel__content">
        <div className="DemoPanel__buttons">
          {Object.keys(MSG_TYPE).map((k) => (
            <StyledButton
              key={MSG_TYPE[k]}
              className={`btn btn-${MSG_TYPE[k]}`}
              type="button"
              kind={MSG_TYPE[k]}
              onClick={() => handleOnClick(MSG_TYPE[k])}
            >
              {MSG_TYPE[k]}
            </StyledButton>
          ))}
        </div>

        <div className="DemoPanel__props">
          <h3>Props</h3>
          <section className="row-control">
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

          <section className="row-control">
            <label htmlFor="autoDismiss">
              <StyledCheckbox
                id="autoDismiss"
                type="checkbox"
                name="autoDismiss"
                checked={autoDismiss}
                onChange={handleAutoDismissChange}
              />{' '}
              <code>autoDismiss</code>
            </label>

            <label htmlFor="icons">
              <span className="checkbox">
                <StyledCheckbox
                  id="icons"
                  type="checkbox"
                  name="icons"
                  checked={icons}
                  onChange={handleIconsChange}
                />
              </span>{' '}
              <code>icons</code>
            </label>

            <label htmlFor="single">
              <StyledCheckbox
                id="single"
                type="checkbox"
                name="single"
                checked={isSingle}
                onChange={handleIsSingleChange}
              />{' '}
              <code>single</code>
            </label>
          </section>
          <section className="row-control">
            <label htmlFor="pauseOnHover">
              <StyledCheckbox
                id="pauseOnHover"
                type="checkbox"
                name="pauseOnHover"
                checked={pauseOnHover}
                onChange={handlePauseOnHoverChange}
              />{' '}
              <code>pauseOnHover</code>
            </label>

            <label htmlFor="showProgress">
              <StyledCheckbox
                id="showProgress"
                type="checkbox"
                name="showProgress"
                checked={showProgress}
                onChange={handleShowProgressChange}
              />{' '}
              <code>showProgress</code>
            </label>
          </section>
        </div>
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
