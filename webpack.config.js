const path = require('path');
module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },{
        test: /\.(png|jpg|gif|JPG)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ],
  },
};