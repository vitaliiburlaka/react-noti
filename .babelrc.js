module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV)

  const isProd = api.env('production')

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: false,
          exclude: ['transform-typeof-symbol'],
        },
      ],
      ['@babel/preset-react', { development: !isProd, runtime: 'automatic' }],
      ['@babel/preset-typescript'],
    ],
    plugins: ['@emotion'],
    env: {
      test: {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          ['@babel/preset-typescript'],
        ],
      },
    },
  }
}
