# [2.0.0](https://github.com/vitaliiburlaka/react-noti/compare/v1.0.0...v2.0.0) (2026-06-15)


* feat(deps)!: bump to react 19.2 and replace styled-components peer with emotion ([c00cab4](https://github.com/vitaliiburlaka/react-noti/commit/c00cab46aaba2a582fe741804a613ed251ef2ff1))


### Bug Fixes

* **toast:** restore progress-bar animation after emotion keyframes migration ([a7908da](https://github.com/vitaliiburlaka/react-noti/commit/a7908da00ca7d9be656af0e4f0f7453a00da1045))


### Features

* **ci:** add CI workflow and release configuration with semantic-release ([d471339](https://github.com/vitaliiburlaka/react-noti/commit/d471339bbd19fc251a9d974ffab610c217d33142))
* **types:** export public types; strict typescript on examples; drop PropTypes ([5784580](https://github.com/vitaliiburlaka/react-noti/commit/5784580cfaa7e7a3e43506d5659743ef2a188bc8))


### BREAKING CHANGES

* The styled-components peer dependency has been
replaced with @emotion/react and @emotion/styled (both ^11). Consumers
upgrading react-noti must uninstall styled-components (if it was only
installed for this library) and install the two @emotion packages.
The public component API (`<ReactNoti />`, `notify`, `POSITION`) is
unchanged. UMD bundle externals also rename: `styled-components` ->
`styled` becomes `@emotion/react` -> `emotionReact` and
`@emotion/styled` -> `emotionStyled`. Minimum Node is now 18.18.
