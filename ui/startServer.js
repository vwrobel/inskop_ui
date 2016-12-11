require('babel-polyfill');
const { server } = require('universal-webpack');
const settings = require('./webpack/universal-webpack-settings');
const configuration = require('./webpack/config');

// for Material UI in Chrome
global.navigator = { userAgent: 'all' };
server(configuration, settings);
