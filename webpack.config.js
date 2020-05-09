/* eslint-disable global-require */

const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const publicPath = process.env.PUBLIC_URL || ''
const appBuild = path.resolve(__dirname, 'examples/build')
const appSrc = path.resolve(__dirname, './examples/src')
const libSrc = path.resolve(__dirname, './src')
const appIndexJs = './examples/src/index.js'
const appIndexHtml = 'examples/public/index.html'
const isEnvProduction = process.env.NODE_ENV === 'production'
const isEnvDevelopment = process.env.NODE_ENV === 'development'
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'
const IMAGE_INLINE_SIZE_LIMIT = 10000

const pkg = require('./package.json')

const webpackDevServerConfig = require('./webpackDevServer.config')

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
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      // css is located in `static/css`, use '../../' to locate index.html folder
      // in production `publicPath` can be a relative path
      options: publicPath.startsWith('.') ? { publicPath: '../../' } : {},
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
        sourceMap: isEnvProduction && shouldUseSourceMap,
      },
    },
  ].filter(Boolean)
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

module.exports = (env) => ({
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  // Stop compilation early in production
  bail: isEnvProduction,
  // eslint-disable-next-line no-nested-ternary
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-source-map',
  entry: isEnvDevelopment ? ['react-hot-loader/patch', appIndexJs] : appIndexJs,
  output: {
    path: isEnvProduction ? appBuild : undefined,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: isEnvDevelopment,
    filename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].js'
      : isEnvDevelopment && 'static/js/bundle.js',
    // TODO: remove this when upgrading to webpack 5
    futureEmitAssets: true,
    chunkFilename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : isEnvDevelopment && 'static/js/[name].chunk.js',
    publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: isEnvProduction
      ? (info) =>
          path.relative(appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
      : isEnvDevelopment &&
        ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    // Prevents conflicts when multiple webpack runtimes (from different apps)
    // are used on the same page.
    jsonpFunction: `webpackJsonp${pkg.name}`,
    // this defaults to 'window', but by setting it to 'this' then
    // module chunks which are built will work in web workers as well.
    globalObject: 'this',
  },
  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            // Parse ecma 8 code safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
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
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        },
      }),
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules'), appSrc, libSrc],
    extensions: moduleFileExtensions.map((ext) => `.${ext}`),
    alias: isEnvDevelopment ? { 'react-dom': '@hot-loader/react-dom' } : {},
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
              cache: true,
              ignore: false,
            },
          },
        ],
        include: [appSrc, libSrc],
      },
      {
        test: /\.(js|mjs|jsx)$/,
        include: [appSrc, libSrc],
        loader: require.resolve('babel-loader'),
        options: {
          compact: true,
          plugins: [
            isEnvDevelopment && 'react-hot-loader/babel',
            isEnvProduction && [
              'babel-plugin-transform-react-remove-prop-types',
              { removeImport: true },
            ],
          ].filter(Boolean),
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
              limit: IMAGE_INLINE_SIZE_LIMIT,
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
              limit: IMAGE_INLINE_SIZE_LIMIT,
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
    new HtmlWebpackPlugin({
      inject: true,
      template: appIndexHtml,
      favicon: './examples/public/favicon.ico',
      ...(isEnvProduction
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
    }),
    isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
    isEnvDevelopment && new CaseSensitivePathsPlugin(),
    isEnvProduction &&
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
    env &&
      env.analyze &&
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      }),
  ].filter(Boolean),
  devServer: isEnvDevelopment ? webpackDevServerConfig : {},
  node: {
    Buffer: false,
    process: false,
  },
})
