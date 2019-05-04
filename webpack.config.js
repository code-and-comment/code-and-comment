const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1500,
    ignored: ['node_modules', 'dist']
  },
  entry: {
    app: './src/jsx/index.jsx',
    repositories: './src/jsx/repositories.jsx',
    codeAndComments: './src/jsx/codeAndComments.jsx',
    index: './src/scss/index.scss',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            sourceMap: true,
            plugins: [
              ['@babel/plugin-transform-react-jsx', {'pragma': 'h'}],
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ] 
      },
      {
        test: /(\.mjs$|\.js$)/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
  ],
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
};
