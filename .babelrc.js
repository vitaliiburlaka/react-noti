const isEnvProduction = process.env.NODE_ENV === 'production'

// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          // Do not transform modules to CJS
          modules: false,
          // Exclude transforms that make all code slower
          exclude: ['transform-typeof-symbol'],
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      !isEnvProduction && 'react-hot-loader/babel',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    ].filter(Boolean),
    env: {
      production: {
        plugins: [
          ['babel-plugin-transform-react-remove-prop-types', { mode: 'wrap' }],
        ],
      },
      test: {
        presets: [[
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ], '@babel/preset-react'],
      },
    },
  }
}
