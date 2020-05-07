import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import url from '@rollup/plugin-url'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import svgr from '@svgr/rollup'

import pkg from './package.json'

const indexJs = './src/index.js'

function kebabToPascalCase(str) {
  return str.replace(/-([a-z])/g, (_, up) => up.toUpperCase())
}

const commonPlugins = [
  url(),
  postcss({
    extract: path.resolve(`dist/${pkg.name}.css`),
    modules: false,
    use: ['sass'],
  }),
  filesize(),
  svgr(),
  babel({ exclude: 'node_modules/**' }),
  resolve(),
  commonjs({ exclude: 'src/**' }),
  terser(),
]

export default [
  // browser-friendly UMD build
  {
    input: indexJs,
    external: ['react'],
    output: {
      name: kebabToPascalCase(pkg.name),
      file: pkg.browser,
      format: 'umd',
    },
    plugins: commonPlugins,
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: indexJs,
    external: ['react'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: commonPlugins,
  },
]
