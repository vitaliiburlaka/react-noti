import { useState, type ChangeEvent } from 'react'
import { ReactNoti, notify, POSITION, type Position } from '../../src/index'

import StyledApp from './App.styled'
import Header from './components/Header'
import Footer from './components/Footer'
import DemoPanel from './components/DemoPanel'
import { StyledContent } from './styled'

import { MSG_TYPE, type MsgType } from './constants'

function App() {
  // ReactNoti props
  const [position, setPosition] = useState<Position>(POSITION.TOP_RIGHT)
  const [autoDismiss, setAutoDismiss] = useState<boolean>(true)
  const [icons, setIcons] = useState<boolean>(true)
  const [isSingle, setIsSingle] = useState<boolean>(false)
  const [timeOut, setTimeOut] = useState<number>(5000)
  const [pauseOnHover, setPauseOnHover] = useState<boolean>(true)
  const [showProgress, setShowProgress] = useState<boolean>(true)

  const handlePositionChange = ({ target }: ChangeEvent<HTMLSelectElement>) =>
    setPosition(target.value as Position)
  const handleTimeOutChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setTimeOut(Number(target.value) || 0)
  const handleAutoDismissChange = () => setAutoDismiss(!autoDismiss)
  const handleIconsChange = () => setIcons(!icons)
  const handleIsSingleChange = () => setIsSingle(!isSingle)
  const handlePauseOnHoverChange = () => setPauseOnHover(!pauseOnHover)
  const handleShowProgressChange = () => setShowProgress(!showProgress)

  const handleOnClick = (type: MsgType) => {
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

  const handlePromiseClick = () => {
    const request = new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) resolve('data')
        else reject(new Error('Request failed'))
      }, 2000)
    })

    notify.promise(
      request,
      {
        loading: 'Processing your request…',
        success: 'All done!',
        error: (err) => (err as Error).message,
      },
      { title: 'Promise' }
    )
  }

  return (
    <StyledApp className="App">
      <ReactNoti
        position={position}
        autoDismiss={autoDismiss}
        single={isSingle}
        icons={icons}
        timeOut={timeOut}
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
          handlePromiseClick={handlePromiseClick}
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
