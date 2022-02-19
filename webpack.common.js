const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'zettai-lib.js',
    library: 'zettai',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true })
  ]
}
