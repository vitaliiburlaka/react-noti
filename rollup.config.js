/* eslint-disable global-require */
import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import url from '@rollup/plugin-url'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import svgr from '@svgr/rollup'

import pkg from './package.json'

const indexJs = './src/index.js'

const root = process.platform === 'win32' ? path.resolve('/') : '/'
const external = (id) => !id.startsWith('.') && !id.startsWith(root)

function kebabToPascalCase(str) {
  return str
    .replace(/(^\w|-\w)/g, (_, up) => up.toUpperCase())
    .split('-')
    .join('')
}

const getBabelOptions = ({ useESModules }) => ({
  babelHelpers: 'runtime',
  exclude: '**/node_modules/**',
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: !useESModules,
        useESModules,
        version: require('@babel/runtime/package.json').version,
      },
    ],
    ['transform-react-remove-prop-types', { mode: 'wrap' }],
  ],
})

const commonPlugins = [
  url(),
  svgr(),
  postcss({
    extract: `dist/${pkg.name}.css`,
    modules: false,
    use: ['sass'],
    plugins: [
      require('postcss-url')({
        url: 'inline',
      }),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
    ],
  }),
  filesize(),
  nodeResolve(),
]

export default [
  // CommonJS
  {
    input: indexJs,
    external,
    output: {
      file: `./dist/${pkg.name}.cjs.js`,
      format: 'cjs',
      exports: 'named',
    },
    plugins: [
      ...commonPlugins,
      babel(getBabelOptions({ useESModules: false })),
      commonjs(),
    ],
  },

  // ES
  {
    input: indexJs,
    external,
    output: { file: `./dist/${pkg.name}.esm.js`, format: 'esm' },
    plugins: [
      ...commonPlugins,
      babel(getBabelOptions({ useESModules: true })),
      commonjs(),
    ],
  },

  // UMD Development
  {
    input: indexJs,
    external,
    output: {
      file: `./dist/${pkg.name}.js`,
      format: 'umd',
      exports: 'named',
      name: kebabToPascalCase(pkg.name),
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    plugins: [
      ...commonPlugins,
      babel({
        babelHelpers: 'bundled',
        exclude: '**/node_modules/**',
        plugins: [
          ['transform-react-remove-prop-types', { removeImport: true }],
        ],
      }),
      commonjs(),
    ],
  },

  // UMD Production
  {
    input: indexJs,
    external,
    output: {
      file: `./dist/${pkg.name}.min.js`,
      format: 'umd',
      exports: 'named',
      name: kebabToPascalCase(pkg.name),
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    plugins: [
      ...commonPlugins,
      babel({
        babelHelpers: 'bundled',
        exclude: '**/node_modules/**',
        plugins: [
          ['transform-react-remove-prop-types', { removeImport: true }],
        ],
      }),
      commonjs(),
      terser(),
    ],
  },
]
