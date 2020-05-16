'use strict'

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
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
      ['transform-react-remove-prop-types', { removeImport: true }],
    ].filter(Boolean),
    env: {
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
