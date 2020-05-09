// import/no-named-as-default
import { hot } from 'react-hot-loader/root'
import React, { useState } from 'react'

import ReactNoti, { notify, POSITION } from '../../src/index'

import reactNotiLogo from './assets/react-noti-logo.png'

import './App.scss'

const MSG_TYPE = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
}

function App() {
  // ReactNoti props
  const [position, setPosition] = useState(POSITION.TOP_RIGHT) // default
  const [autoDismiss, setAutoDismiss] = useState(true) // default
  const [icons, setIcons] = useState(true) // default
  const [isSingle, setIsSingle] = useState(false) // default
  const [timeOut, setTimeOut] = useState(5000) // default

  const handlePositionChange = ({ target }) => {
    setPosition(target.value)
  }

  const handleTimeOutChange = ({ target }) => {
    setTimeOut(target.value)
  }

  const handleOnClick = (type) => {
    switch (type) {
      case MSG_TYPE.SUCCESS:
        notify.success('Lorem ipsum dolor sit amet', {
          title: 'Success!',
        })
        break
      case MSG_TYPE.INFO:
        notify.info('Cum, laborum animi.', {
          title: 'Info!',
        })
        break
      case MSG_TYPE.WARNING:
        notify.warning('Ipsum cum corporis similique eligendi', {
          title: 'Warning!',
        })
        break
      case MSG_TYPE.ERROR:
        notify.error('Veniam dolor repudiandae cumque!', {
          title: 'Error!',
        })
        break
      default:
        break
    }
  }

  return (
    <div className="App">
      <ReactNoti
        position={position}
        autoDismiss={autoDismiss}
        single={isSingle}
        icons={icons}
        timeOut={timeOut * 1}
      />

      <header className="App__header">
        <h1 className="logo">
          <a href="https://vitaliiburlaka.github.io/react-noti">
            <img src={reactNotiLogo} alt="React Noti logo" />
          </a>
        </h1>
        <a
          className="github"
          href="https://github.com/vitaliiburlaka/react-noti"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </header>

      <div className="App__content">
        <div className="demo-panel">
          <div className="demo-panel__header">
            <h2 className="react-noti">react-noti</h2>
            <div className="big-text">Notifications made easy.</div>
          </div>

          <div className="demo-panel__content">
            <div className="demo-panel__buttons">
              {Object.keys(MSG_TYPE).map((k) => (
                <button
                  key={MSG_TYPE[k]}
                  className={`btn btn-${MSG_TYPE[k]}`}
                  type="button"
                  onClick={() => handleOnClick(MSG_TYPE[k])}
                >
                  {MSG_TYPE[k]}
                </button>
              ))}
            </div>

            <div className="demo-panel__props">
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
                  <input
                    id="autoDismiss"
                    type="checkbox"
                    name="autoDismiss"
                    checked={autoDismiss}
                    onChange={() => setAutoDismiss(!autoDismiss)}
                  />{' '}
                  <code>autoDismiss</code>
                </label>

                <label htmlFor="icons">
                  <span className="checkbox">
                    <input
                      id="icons"
                      type="checkbox"
                      name="icons"
                      checked={icons}
                      onChange={() => setIcons(!icons)}
                    />
                  </span>{' '}
                  <code>icons</code>
                </label>

                <label htmlFor="single">
                  <input
                    id="single"
                    type="checkbox"
                    name="single"
                    checked={isSingle}
                    onChange={() => setIsSingle(!isSingle)}
                  />{' '}
                  <code>single</code>
                </label>
              </section>
            </div>
          </div>
        </div>
      </div>

      <footer className="App__footer">
        © {new Date().getFullYear()} Vitalii Burlaka
        <div className="footer-links">
          <a
            href="https://github.com/vitaliiburlaka"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span> / </span>
          <a
            href="https://twitter.com/vitaliiburlaka"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <span> / </span>
          <a
            href="https://www.linkedin.com/in/vitaliiburlaka/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}

export default hot(App)
