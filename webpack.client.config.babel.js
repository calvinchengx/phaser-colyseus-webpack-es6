import { resolve } from 'path'

let clientConfig = {
  entry: {
    index: './src/client/index.js'
  },
  output: {
    path: resolve(__dirname, 'dist', 'public'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  watch: true,
  mode: 'development',
  target: 'web',
  devtool: '#source-map',
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  }
}

export default clientConfig