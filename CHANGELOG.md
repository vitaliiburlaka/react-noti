# [4.0.0](https://github.com/vitaliiburlaka/react-noti/compare/v3.0.0...v4.0.0) (2026-06-15)


* feat!: replace BEM class names with CSS custom properties and classNames API ([0358ff4](https://github.com/vitaliiburlaka/react-noti/commit/0358ff45cbe6acee08865736145bb77c88e9af55))


### Bug Fixes

* **a11y:** add aria-live to container; aria-label to dismiss button; aria-hidden to icons ([25f70a2](https://github.com/vitaliiburlaka/react-noti/commit/25f70a2e4ffb73e6415eac4f91515b006d850e51))
* move notify.configure() to useEffect; guard Timer.pause() against negative remainingTime ([a241848](https://github.com/vitaliiburlaka/react-noti/commit/a241848e7f93e9d678bbc57c6e198f1a36fd49a8))
* widen content type to ReactNode; export MSG_TYPE and ReactNotiProps; make dismiss id required ([02996d2](https://github.com/vitaliiburlaka/react-noti/commit/02996d2043694decda5f606e7f94957c0b06fd2f))


### Performance Improvements

* memo Toast; stabilise handleStoreChange with useCallback ([29ef24d](https://github.com/vitaliiburlaka/react-noti/commit/29ef24d95cac38a4abfab31f5ea89fad15921a11))


### BREAKING CHANGES

* all ReactNoti__* and RN-icon CSS class names have been
removed from the DOM. Use CSS custom properties (--noti-bg-success etc.)
to theme colours and other design tokens, or the new classNames prop to
apply custom CSS classes to individual toast slots.

# [3.0.0](https://github.com/vitaliiburlaka/react-noti/compare/v2.0.0...v3.0.0) (2026-06-15)


* feat(build)!: replace Rollup+Webpack+Babel+Jest with Vite+Vitest ([d2bad68](https://github.com/vitaliiburlaka/react-noti/commit/d2bad686d4348c0aa9a635f32165a3eb14fef783))


### Bug Fixes

* **build:** remove babel option from @vitejs/plugin-react v6; add missing types ([90bfd6e](https://github.com/vitaliiburlaka/react-noti/commit/90bfd6e8eca7d8786abcfc46d46dc4a9b78d94e0))
* **test:** add jsdom as explicit devDependency for Vitest jsdom environment ([8e3d3b8](https://github.com/vitaliiburlaka/react-noti/commit/8e3d3b89eb7aa28673e6827100029b6bb79cbb50))


### BREAKING CHANGES

* UMD bundle is no longer produced. Use the ESM
(dist/react-noti.esm.js) or CJS (dist/react-noti.cjs.js) output.
Type declarations are now included in the package (dist/index.d.ts).

# [2.0.0](https://github.com/vitaliiburlaka/react-noti/compare/v1.0.0...v2.0.0) (2026-06-15)

- feat(deps)!: bump to react 19.2 and replace styled-components peer with emotion ([c00cab4](https://github.com/vitaliiburlaka/react-noti/commit/c00cab46aaba2a582fe741804a613ed251ef2ff1))

### Bug Fixes

- **toast:** restore progress-bar animation after emotion keyframes migration ([a7908da](https://github.com/vitaliiburlaka/react-noti/commit/a7908da00ca7d9be656af0e4f0f7453a00da1045))

### Features

- **ci:** add CI workflow and release configuration with semantic-release ([d471339](https://github.com/vitaliiburlaka/react-noti/commit/d471339bbd19fc251a9d974ffab610c217d33142))
- **types:** export public types; strict typescript on examples; drop PropTypes ([5784580](https://github.com/vitaliiburlaka/react-noti/commit/5784580cfaa7e7a3e43506d5659743ef2a188bc8))

### BREAKING CHANGES

- The styled-components peer dependency has been
  replaced with @emotion/react and @emotion/styled (both ^11). Consumers
  upgrading react-noti must uninstall styled-components (if it was only
  installed for this library) and install the two @emotion packages.
  The public component API (`<ReactNoti />`, `notify`, `POSITION`) is
  unchanged. UMD bundle externals also rename: `styled-components` ->
  `styled` becomes `@emotion/react` -> `emotionReact` and
  `@emotion/styled` -> `emotionStyled`. Minimum Node is now 18.18.
