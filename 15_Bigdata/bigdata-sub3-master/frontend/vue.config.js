module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://52.79.194.10:8000/',
      },
      '/static/posters': {
        target: 'http://52.79.194.10:8000/',
      },
    }
  }
}