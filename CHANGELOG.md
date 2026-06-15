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
