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
      },
    ],
  },
};