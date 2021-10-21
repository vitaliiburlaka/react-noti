import React, { useState } from 'react'
import { ReactNoti, notify, POSITION } from '../../src/index'

import StyledApp from './App.styled'
import Header from './components/Header'
import Footer from './components/Footer'
import DemoPanel from './components/DemoPanel'
import { StyledContent } from './styled'

import { MSG_TYPE } from './constants'

function App() {
  // ReactNoti props
  const [position, setPosition] = useState(POSITION.TOP_RIGHT) // default
  const [autoDismiss, setAutoDismiss] = useState(true) // default
  const [icons, setIcons] = useState(true) // default
  const [isSingle, setIsSingle] = useState(false) // default
  const [timeOut, setTimeOut] = useState(5000) // default
  const [pauseOnHover, setPauseOnHover] = useState(true) // default
  const [showProgress, setShowProgress] = useState(true) // default

  const handlePositionChange = ({ target }) => setPosition(target.value)
  const handleTimeOutChange = ({ target }) => setTimeOut(target.value)
  const handleAutoDismissChange = () => setAutoDismiss(!autoDismiss)
  const handleIconsChange = () => setIcons(!icons)
  const handleIsSingleChange = () => setIsSingle(!isSingle)
  const handlePauseOnHoverChange = () => setPauseOnHover(!pauseOnHover)
  const handleShowProgressChange = () => setShowProgress(!showProgress)

  const handleOnClick = (type) => {
    switch (type) {
      case MSG_TYPE.SUCCESS:
        notify.success('Good job mate! Keep it going', {
          title: 'Success!',
        })
        break
      case MSG_TYPE.INFO:
        notify.info('Everything seems going fine', {
          title: 'Info!',
        })
        break
      case MSG_TYPE.WARNING:
        notify.warning('Be careful on your journey up there', {
          title: 'Warning!',
        })
        break
      case MSG_TYPE.ERROR:
        notify.error('Oops... Something went wrong', {
          title: 'Error!',
        })
        break
      default:
        break
    }
  }

  return (
    <StyledApp className="App">
      <ReactNoti
        position={position}
        autoDismiss={autoDismiss}
        single={isSingle}
        icons={icons}
        timeOut={timeOut * 1}
        pauseOnHover={pauseOnHover}
        showProgress={showProgress}
      />

      <Header />

      <StyledContent className="App__content">
        <DemoPanel
          position={position}
          handlePositionChange={handlePositionChange}
          timeOut={timeOut}
          handleTimeOutChange={handleTimeOutChange}
          handleOnClick={handleOnClick}
          autoDismiss={autoDismiss}
          handleAutoDismissChange={handleAutoDismissChange}
          icons={icons}
          handleIconsChange={handleIconsChange}
          isSingle={isSingle}
          handleIsSingleChange={handleIsSingleChange}
          pauseOnHover={pauseOnHover}
          handlePauseOnHoverChange={handlePauseOnHoverChange}
          showProgress={showProgress}
          handleShowProgressChange={handleShowProgressChange}
        />
      </StyledContent>

      <Footer />
    </StyledApp>
  )
}

export default App
