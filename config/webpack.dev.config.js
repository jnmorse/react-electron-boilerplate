/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  name: 'client',
  target: 'electron-renderer',
  mode: 'development',

  entry: [path.resolve(__dirname, '../src/index')],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'build')
  },

  devtool: 'eval-source-map',

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
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
        use: 'babel-loader'
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
