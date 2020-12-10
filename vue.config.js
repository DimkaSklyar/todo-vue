// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '/*': {
        port: 3004,
        target: 'http://localhost:3004',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
