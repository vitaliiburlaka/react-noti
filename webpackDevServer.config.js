const path = require('path')

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'

module.exports = {
  static: {
    publicPath: '/',
    directory: path.join(__dirname, 'public'),
  },
  compress: true,
  hot: true,
  https: protocol === 'https',
  port: 9000,
  historyApiFallback: {
    disableDotRule: true,
  },
  open: true,
}
