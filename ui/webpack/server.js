const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./config.client');
const log = require('../src/log');

const webpackPort = process.env.WEBPACK_PORT;
const appPort = process.env.DEV_APP_PORT;

const compiler = webpack(config);
const connstring = (`http://localhost:${appPort}`);

log.info(`Proxying requests to:${connstring}`);

const app = new WebpackDevServer(compiler, {
  contentBase: '/assets/',
  publicPath: '/assets/',
  headers: { 'Access-Control-Allow-Origin': '*' },
  proxy: {
    '/api/*': {
      target: `http://localhost:${process.env.DEV_API_PORT}`,
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' }
    },
    '*': `http://localhost:${appPort}`
  },
  stats: { colors: true },
  hot: true
});

app.listen(webpackPort, () => {
  log.info(`Webpack dev server is now running on http://localhost:${webpackPort}`);
});

