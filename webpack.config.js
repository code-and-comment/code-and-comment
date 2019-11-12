const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1500,
    ignored: ['node_modules', 'dist']
  },
  entry: {
    app: './src/jsx/index.tsx',
    repositories: './src/jsx/repositories.tsx',
    codeAndComments: './src/jsx/codeAndComments.tsx',
    index: './src/scss/index.scss',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /(\.jsx?$|\.tsx?$)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            sourceMap: true,
            presets: [
              ['@babel/preset-typescript', { isTSX: true, allExtensions: true, jsxPragma: 'h' }]
            ],
            plugins: [
              ['@babel/plugin-transform-react-jsx', {pragma: 'h', pragmaFrag: 'Fragment',}],
            ]
          }
        },
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
        test: /(\.mjs$|\.js$|\.ts$)/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
    new ForkTsCheckerWebpackPlugin()
  ],
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
};
