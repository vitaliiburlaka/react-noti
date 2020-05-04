/* eslint-disable object-shorthand */
/* eslint-disable global-require */

const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const pkg = require('./package.json')

const publicPath = '/'
const appBuild = path.resolve(__dirname, 'dist')
const appSrc = path.resolve(__dirname, './src')
const appIndexJs = './src/index.js'
const isEnvProduction = process.env.NODE_ENV === 'production'
const isEnvDevelopment = process.env.NODE_ENV === 'development'
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

function kebabToPascalCase(str) {
  return str.replace(/-([a-z])/g, (_, up) => up.toUpperCase())
}

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'json',
  'web.jsx',
  'jsx',
]

// Style files regexes
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

// Common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        sourceMap: shouldUseSourceMap,
      },
    },
  ]
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: shouldUseSourceMap,
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      }
    )
  }
  return loaders
}

const externals = {
  react: {
    root: 'React',
    commonjs: 'react',
    commonjs2: 'react',
    amd: 'react',
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs: 'react-dom',
    commonjs2: 'react-dom',
    amd: 'react-dom',
  },
}

module.exports = (env) => ({
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  // Stop compilation early in production
  bail: isEnvProduction,
  devtool: shouldUseSourceMap ? 'source-map' : false,
  entry: {
    [`${pkg.name}`]: appIndexJs,
  },
  output: {
    path: appBuild,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    library: kebabToPascalCase(pkg.name),
    libraryTarget: 'umd',
    publicPath: publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: isEnvProduction
      ? (info) =>
          path.relative(appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
      : isEnvDevelopment &&
        ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
  },
  externals: externals,
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            // Turned on because emoji and regex is not minified properly using default
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: shouldUseSourceMap,
      }),
      // This is only used in production mode
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: shouldUseSourceMap
            ? {
                // Forces the sourcemap to be output into a separate file
                inline: false,
                // Appends the sourceMappingURL to the end of the css file
                annotation: true,
              }
            : false,
        },
      }),
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), appSrc],
    extensions: moduleFileExtensions.map((ext) => `.${ext}`),
  },
  module: {
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      // First, run the linter before Babel processed the JS.
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: require.resolve('eslint-loader'),
            options: {
              ignore: false,
            },
          },
        ],
        include: appSrc,
      },
      {
        test: /\.(js|mjs|jsx)$/,
        include: appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          compact: true,
        },
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        loader: getStyleLoaders({
          importLoaders: 1,
          sourceMap: shouldUseSourceMap,
        }),
        sideEffects: true,
      },
      // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
      // using the extension .module.css
      {
        test: cssModuleRegex,
        use: getStyleLoaders({
          importLoaders: 1,
          sourceMap: isEnvProduction && shouldUseSourceMap,
        }),
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        loader: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: shouldUseSourceMap,
          },
          'sass-loader'
        ),
        sideEffects: true,
      },
      // Adds support for CSS Modules, but using SASS
      // using the extension .module.scss or .module.sass
      {
        test: sassModuleRegex,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: isEnvProduction && shouldUseSourceMap,
          },
          'sass-loader'
        ),
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg?g|png|gif)$/i,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    env &&
      env.analyze &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
  ].filter(Boolean),
  node: {
    Buffer: false,
    process: false,
  },
})
