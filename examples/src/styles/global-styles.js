import { createGlobalStyle } from 'styled-components'

import colors from './colors'

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.15;
    color: #1e1f20;
    text-align: left;
    background-color: #fdfaf6;
  }

  ${'' /* Remove top margins from headings */}
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 20px;
  }

  p {
    margin-top: 0;
    margin-bottom: 20px;
  }

  ol,
  ul,
  dl {
    margin-top: 0;
    margin-bottom: 16px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  figure {
    margin: 0;
  }

  img {
    max-width: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
    padding-bottom: 0.15em;
    transition: all 0.2s ease;

    &:hover {
      color: ${colors.deepPurple};
      box-shadow: 0 1px 0 0 currentColor;
    }
  }

  ${'' /* Forms */}
  fieldset {
    border: 0;
    padding: 0;
    margin-bottom: 8px;
  }

  input[type='text'],
  input[type='number'],
  input[type='email'],
  input[type='password'],
  input[type='search'],
  input[type='tel'],
  select {
    margin: 0 8px;
    padding: 6px 8px;
    min-height: 32px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 14px;
    background: ${colors.offYellow};
    transition: all 0.15s ease;

    &:hover {
      border-color: rgba(0, 0, 0, 0.83);
    }
  }

  select {
    position: relative;
    display: inline-block;
    color: currentColor;
    margin: 0 8px;
    padding: 6px 8px;
    max-width: 100%;
    border: 1px solid transparent;
    border-radius: 4px;
    min-height: 32px;
    height: 32px;
    background: ${colors.offYellow};
    transition: all 0.15s ease;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;

    ${'' /* Custom arrow */}
    background-image: linear-gradient(45deg, transparent 50%, ${
      colors.primary
    } 50%),
      linear-gradient(135deg, ${colors.primary} 50%, transparent 50%);
    background-position: calc(100% - 15px) calc(1em - 1px),
      calc(100% - 10px) calc(1em - 1px);
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;

    &:hover {
      border-color: rgba(0, 0, 0, 0.83);
    }
  }
`

export default GlobalStyle
