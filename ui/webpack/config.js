// This is the base Webpack configuration file

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
require('dotenv').config({silent: true});

const nodeEnv = process.env.NODE_ENV;

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(nodeEnv),
      'PUBLIC_DIR': JSON.stringify(process.env.PUBLIC_DIR),
      'ASSETS_MAP_FILE': JSON.stringify(process.env.ASSETS_MAP_FILE),
      'DEV_APP_PORT': JSON.stringify(process.env.DEV_APP_PORT),
      'DEV_API_PORT': JSON.stringify(process.env.DEV_API_PORT),
      'PROD_APP_PORT': JSON.stringify(process.env.PROD_APP_PORT),
      'WEBPACK_PORT': JSON.stringify(process.env.WEBPACK_PORT),
      'SERVER_ADDRESS': JSON.stringify(process.env.SERVER_ADDRESS),
      'WS_ADDRESS': JSON.stringify(process.env.WS_ADDRESS),
      'MEDIA_URL': JSON.stringify(process.env.MEDIA_URL),
      'AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN),
      'AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID),
      'AUTH0_CLIENT_SECRET': JSON.stringify(process.env.AUTH0_CLIENT_SECRET)
    }
  })
];

if (nodeEnv === 'development') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        screw_ie8: true
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  );

}


//new BundleAnalyzerPlugin()

const root_folder = path.resolve(__dirname, '..');

const configuration =
{

  context: root_folder,

  // https://webpack.github.io/docs/multiple-entry-points.html
  entry: {
    bundle: (nodeEnv === 'development') ? [
      'babel-polyfill',
      `webpack-dev-server/client?http://localhost:${process.env.WEBPACK_PORT}`,
      'webpack/hot/only-dev-server',
      './src/client/client.js'
    ] : [
      'babel-polyfill',
      './src/client/client.js'
    ]
  },

  output: {
    // filesystem path for static files
    path: path.resolve(root_folder, process.env.PUBLIC_DIR, 'assets'),

    // network path for static files
    publicPath: '/assets/',

    // file name pattern for entry scripts
    filename: '[name].[hash].js',

    // file name pattern for chunk scripts
    chunkFilename: '[name].[hash].js'
  },

  node :
  {
    fs: 'empty'
  },
  module: {
    noParse: [],
    loaders: [
      { test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/, loaders: ['transform-loader/cacheable?brfs', 'transform-loader/cacheable?packageify'] },
      { test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/, loader: 'transform-loader/cacheable?ejsify' },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=10240' // any image below or equal to 10K will be converted to inline base64 instead
      },
      {
        test: /\.(pdf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(mp4)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(yaml)$/,
        loader: 'raw-loader'
      }
    ]
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
  // maybe some kind of a progress bar during compilation
  progress: true,

  resolve: {
    // you can now require('file') instead of require('file.[extension]')
    extensions: ['', '.json', '.js'],
    packageMains: ['browser', 'web', 'browserify', 'main', 'style'],
    alias: {
      webworkify: 'webworkify-webpack'
    }
  },
  plugins: plugins
};

module.exports = configuration;
