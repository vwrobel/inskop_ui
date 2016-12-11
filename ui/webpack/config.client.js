const { client_configuration } = require('universal-webpack');
const settings = require('./universal-webpack-settings');
const configuration = require('./config');

const clientConfig = client_configuration(configuration, settings);

module.exports = clientConfig;
