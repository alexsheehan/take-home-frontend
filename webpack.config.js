const path = require('path');

const SRC_DIR = path.join(__dirname, './src');
const DIST_DIR = path.join(__dirname, './dist');
module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  module: {
    rules: [{
      test: /\.(s*)css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.jsx?/,
      include: SRC_DIR,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      }],
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    }],
  },
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
};
