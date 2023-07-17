const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devtool: false, // Disable source map generation
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};