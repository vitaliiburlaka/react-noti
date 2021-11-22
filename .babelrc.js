// eslint-disable-next-line func-names
module.exports = function (api) {
  // This caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);

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
      // Enable development transform of React with new automatic runtime
      ['@babel/preset-react', { development: !api.env('production'), runtime: 'automatic' }],
    ],
    plugins: [
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
      ['transform-react-remove-prop-types', { removeImport: true }],
    ].filter(Boolean),
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
          ['@babel/preset-react', {
            'runtime': 'automatic'
          }]
        ],
      },
    },
  }
}
