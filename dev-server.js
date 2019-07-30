/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const { spawn } = require('child_process');
const path = require('path');

const webpackConfig = require('./config/webpack.dev.config');

const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
  compress: true,
  noInfo: true,
  stats: 'errors-only',
  inline: true,
  lazy: false,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  contentBase: path.join(__dirname, 'dist'),
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/u,
    poll: 100
  },
  historyApiFallback: {
    verbose: true,
    disableDotRule: false
  },
  before() {
    console.log('Starting Main Process...');
    spawn('electron', ['.'], {
      shell: true,
      env: process.env,
      stdio: 'inherit'
    })
      .on('close', code => process.exit(code))
      .on('error', spawnError => console.error(spawnError));
  }
});

const PORT = 8080;
const HOST = '0.0.0.0';

devServer.listen(PORT, HOST, error => {
  if (error) {
    console.log(error.message);
  }

  console.log(`App: http://localhost:${PORT}/`);
});
