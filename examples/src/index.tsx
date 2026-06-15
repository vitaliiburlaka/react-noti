import React from 'react'
import { createRoot } from 'react-dom/client'
import { Global } from '@emotion/react'

import globalStyles from './styles/global-styles'
import App from './App'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Root container `#root` not found in index.html')
}

createRoot(container).render(
  <React.StrictMode>
    <>
      <Global styles={globalStyles} />
      <App />
    </>
  </React.StrictMode>
)
