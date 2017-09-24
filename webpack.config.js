require('babel-polyfill')
var webpack = require('webpack')
var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, 'public')
var JS_DIR = path.resolve(__dirname, 'src/js')

module.exports = {
    entry: ['babel-polyfill', JS_DIR + '/index.js'],
    output: {
        path: BUILD_DIR,
        filename: 'resources/js/bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'config': path.resolve(__dirname, 'app.config.js'),
        'my-nosleep': __dirname + '/lib/NoSleep.min'
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'ENV': {},
        'ENV.socketUrl': JSON.stringify(process.env.SOCKET_URL)
      }),
      new webpack.ProvidePlugin({
        'ENV.config': 'config',
      }),
      new CopyWebpackPlugin([
        { from: 'src/html' },
      ])
    ],
     module: { loaders: [
        { 
           test: /\.jsx?$/, 
           include: [JS_DIR,
             path.resolve(__dirname, 'node_modules')
           ],
           //exclude: /(node_modules)/, 
           loader: 'babel-loader' 
        },
        {
          test: /\.scss/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.css/,
          loaders: ['style-loader', 'css-loader']
        }

       ]
   }
}
