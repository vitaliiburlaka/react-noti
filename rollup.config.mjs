import path from 'path'
import { createRequire } from 'module'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import url from '@rollup/plugin-url'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import filesize from 'rollup-plugin-filesize'
import svgr from '@svgr/rollup'
import postcssUrl from 'postcss-url'
import postcssPresetEnv from 'postcss-preset-env'

const require = createRequire(import.meta.url)
const babelRuntimePkg = require('@babel/runtime/package.json')
const pkg = require('./package.json')

const indexJs = './src/index.ts'
const extensions = ['.ts', '.tsx', '.mjs', '.js', '.jsx']

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
  extensions,
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: !useESModules,
        useESModules,
        version: babelRuntimePkg.version,
      },
    ],
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
      postcssUrl({
        url: 'inline',
      }),
      postcssPresetEnv({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
    ],
  }),
  filesize(),
  nodeResolve({ extensions }),
]

const umdGlobals = {
  react: 'React',
  'react/jsx-runtime': 'React',
  'react-dom': 'ReactDOM',
  '@emotion/react': 'emotionReact',
  '@emotion/styled': 'emotionStyled',
  '@emotion/styled/base': 'emotionStyled',
}

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
      globals: umdGlobals,
    },
    plugins: [
      ...commonPlugins,
      babel({
        babelHelpers: 'bundled',
        exclude: '**/node_modules/**',
        extensions,
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
      globals: umdGlobals,
    },
    plugins: [
      ...commonPlugins,
      babel({
        babelHelpers: 'bundled',
        exclude: '**/node_modules/**',
        extensions,
      }),
      commonjs(),
      terser(),
    ],
  },
]
