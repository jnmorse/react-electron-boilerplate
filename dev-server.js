/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const { spawn } = require('child_process');
const path = require('path');

const webpackConfig = require('./config/webpack.dev.config');

const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
  hot: true,
  stats: {
    colors: true,
    chunks: false,
    children: false
  },
  after() {
    spawn('electron', ['.'], {
      shell: true,
      env: process.env,
      stdio: 'inherit'
    })
      .on('close', code => process.exit(code))
      // eslint-disable-next-line no-console
      .on('error', error => console.error(error));
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
