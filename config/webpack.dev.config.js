/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');

process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';

module.exports = {
  name: 'client',
  target: 'electron-renderer',
  mode: 'development',

  entry: ['react-hot-loader/patch', path.resolve(__dirname, '../src/index')],

  externals: ['react-router-dom', 'react-router'],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },

  devtool: 'eval-source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, '../node_modules'),
      path.join(__dirname, '../src')
    ]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/u,
        exclude: /node_modules/u,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx)$/u,
        loader: 'react-hot-loader/webpack',
        include: /node_modules/u
      },
      {
        test: /\.css$/u,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, '../../src')
              }
            }
          }
        ]
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /node_modules/u,
          name: 'vendor'
        }
      }
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      BABEL_ENV: 'development'
    }),
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],

  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  devServer: {
    stats: {
      colors: true,
      chunks: false,
      children: false
    },
    before() {
      spawn('electron', ['.'], {
        shell: true,
        env: process.env,
        stdio: 'inherit'
      })
        .on('close', code => process.exit(code))
        // eslint-disable-next-line no-console
        .on('error', error => console.error(error));
    }
  }
};
