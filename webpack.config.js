module.exports = {
  mode: 'development',
  entry: {
    app: './src/jsx/index.jsx',
    repositories: './src/jsx/repositories.jsx',
    codeAndComments: './src/jsx/codeAndComments.jsx',
  },
  devtool: 'cheap-module-eval-source-map',
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
        test: /\.jsx?$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};
