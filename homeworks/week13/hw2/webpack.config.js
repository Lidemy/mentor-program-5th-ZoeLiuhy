const path = require('path')

module.exports = {
  mode: 'production', // production || development
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'commentPlugin'
  }
}
