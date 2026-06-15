<div align="center">
  <h1><img width="120" alt="react-noti" src="assets/react-noti-logo.png"/></h1>
  <p>Toast Notifications made simple.</p>
</div>

---

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmcharts]
[![MIT License][license-badge]][license]

<img alt="ReactNoti toast notifications screenshot" src="assets/screenshot.png"/>

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
  - [TypeScript](#typescript)
  - [JavaScript](#javascript)
- [API](#api)
  - [`ReactNoti` container](#reactnoti-container)
  - [`notify` toast options](#notify-toast-options)
    - [Optional `notify` methods parameters](#optional-notify-methods-parameters)
- [TypeScript types](#typescript-types)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Demo

[A demo is worth a thousand words](https://vitaliiburlaka.github.io/react-noti)

## Installation

```bash
npm install react-noti @emotion/react @emotion/styled
```

**Requirements:**

- React 19 or later
- `@emotion/react` and `@emotion/styled` as peer dependencies

TypeScript declarations are bundled in the package — no `@types/react-noti` needed.

## Usage

Place `<ReactNoti />` once near the root of your app. Call `notify.*` from anywhere.

### TypeScript

```tsx
import { ReactNoti, notify, POSITION } from 'react-noti'
import type { Position, ToastOptions } from 'react-noti'

function App() {
  const position: Position = POSITION.TOP_RIGHT

  const handleSuccess = () => {
    notify.success('Operation completed successfully.')
  }

  const handleInfo = () => {
    const options: ToastOptions = { title: 'Heads up' }
    notify.info('Here is some information.', options)
  }

  const handleWarning = () => {
    notify.warning('This action cannot be undone.', {
      title: 'Warning',
      autoDismiss: false,
    })
  }

  const handleError = () => {
    notify.error('Something went wrong.', {
      title: 'Error',
      timeOut: 9000,
    })
  }

  return (
    <div>
      <ReactNoti position={position} />

      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleInfo}>Info</button>
      <button onClick={handleWarning}>Warning</button>
      <button onClick={handleError}>Error</button>
    </div>
  )
}

export default App
```

### JavaScript

```jsx
import { ReactNoti, notify, POSITION } from 'react-noti'

function App() {
  return (
    <div>
      <ReactNoti position={POSITION.TOP_RIGHT} />

      <button onClick={() => notify.success('Done!')}>Success</button>
      <button onClick={() => notify.info('FYI', { title: 'Note' })}>Info</button>
      <button onClick={() => notify.warning('Be careful', { autoDismiss: false })}>Warning</button>
      <button onClick={() => notify.error('Oops', { timeOut: 9000 })}>Error</button>
    </div>
  )
}

export default App
```

## API

### `ReactNoti` container

<!-- prettier-ignore-start -->
| Prop           | Type      | Default       | Required | Description |
| -------------- | --------- | ------------- | -------- | ----------- |
| `position`     | `Position` | `'top-right'` | ✘        | Screen position. One of: `top-right` `top-left` `top-center` `bottom-right` `bottom-left` `bottom-center`. Use the `POSITION` constant to avoid typos. |
| `autoDismiss`  | `boolean` | `true`        | ✘        | Auto-dismiss all toasts after `timeOut`. Can be overridden per toast. |
| `timeOut`      | `number`  | `5000`        | ✘        | Default dismiss delay in ms. Can be overridden per toast. |
| `single`       | `boolean` | `false`       | ✘        | Show only the most recent toast (replaces older ones). |
| `icons`        | `boolean` | `true`        | ✘        | Show built-in icons on each toast. |
| `pauseOnHover` | `boolean` | `true`        | ✘        | Pause the dismiss timer while the cursor is over a toast. |
| `showProgress` | `boolean` | `true`        | ✘        | Show a progress bar counting down to dismiss. |
| `className`    | `string`  | `undefined`   | ✘        | Extra CSS class added to the container element. |

### `notify` toast options

| Parameter | Type                    | Required | Description |
| --------- | ----------------------- | -------- | ----------- |
| `content` | `string \| ReactNode`   | ✓        | Toast body — a string or any React element. |
| `options` | `ToastOptions`          | ✘        | Per-toast overrides (see below). |

#### Optional `notify` methods parameters

| Option        | Type      | Default     | Description |
| ------------- | --------- | ----------- | ----------- |
| `title`       | `string`  | `undefined` | Title displayed above the toast body. |
| `autoDismiss` | `boolean` | `true`      | Override the container `autoDismiss` for this toast. |
| `timeOut`     | `number`  | `5000`      | Override the container `timeOut` for this toast. |
| `pauseOnHover`| `boolean` | `true`      | Override the container `pauseOnHover` for this toast. |
| `showProgress`| `boolean` | `true`      | Override the container `showProgress` for this toast. |
<!-- prettier-ignore-end -->

> Toast-level options take priority over `ReactNoti` container props.

```tsx
// Pass a React element as content
const Avatar = ({ src }: { src: string }) => (
  <span><img width={48} src={src} alt="" /></span>
)

notify.success('Plain text toast')
notify.info('With title and custom timeout', { title: 'Note', timeOut: 8000 })
notify.warning(<Avatar src="/avatar.png" />, { autoDismiss: false })
notify.error('Something failed', { title: 'Error', pauseOnHover: false })

// Dismiss all toasts
notify.closeAll()
```

## TypeScript types

All public types are exported from `react-noti`:

```ts
import type {
  Position,       // Union of all valid position strings
  MsgType,        // 'success' | 'info' | 'warning' | 'error'
  ToastOptions,   // Per-toast option overrides
  ToastItem,      // Shape of a toast in the internal store
  NotifyConfig,   // Shape of the global notify configuration
  RegisterOptions,// Argument to notify.register()
  ToastType,      // Alias for MsgType (deprecated — prefer MsgType)
} from 'react-noti'
```

Use `Position` and `MsgType` to type your own state or props:

```tsx
import { POSITION } from 'react-noti'
import type { Position, MsgType, ToastOptions } from 'react-noti'

interface ToastButtonProps {
  type: MsgType
  message: string
  options?: ToastOptions
}

function ToastButton({ type, message, options }: ToastButtonProps) {
  return (
    <button onClick={() => notify[type](message, options)}>
      {type}
    </button>
  )
}

// Position values are strongly typed
const position: Position = POSITION.BOTTOM_LEFT
```

## License

[MIT](LICENSE)

<!-- prettier-ignore-start -->
[build-badge]: https://github.com/vitaliiburlaka/react-noti/actions/workflows/ci.yml/badge.svg
[build]: https://github.com/vitaliiburlaka/react-noti/actions/workflows/ci.yml
[coverage-badge]: https://img.shields.io/codecov/c/github/vitaliiburlaka/react-noti.svg
[coverage]: https://codecov.io/github/vitaliiburlaka/react-noti
[version-badge]: https://img.shields.io/npm/v/react-noti.svg
[package]: https://www.npmjs.com/package/react-noti
[downloads-badge]: https://img.shields.io/npm/dm/react-noti.svg
[npmcharts]: http://npmcharts.com/compare/react-noti
[license-badge]: https://img.shields.io/npm/l/react-noti.svg
[license]: https://github.com/vitaliiburlaka/react-noti/blob/master/LICENSE
<!-- prettier-ignore-end -->
