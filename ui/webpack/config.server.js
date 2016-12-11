const { server_configuration } = require('universal-webpack');
const settings = require('./universal-webpack-settings');
const configuration = require('./config');

const serverConfig = server_configuration(configuration, settings);

module.exports = serverConfig;
