import React from 'react'
import { createRoot } from 'react-dom/client'

import GlobalStyle from './styles/global-styles'
import App from './App'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <GlobalStyle />
      <App />
    </>
  </React.StrictMode>
)
