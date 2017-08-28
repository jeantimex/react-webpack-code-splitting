const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Okay, this may be confusing at first glance but go through it step-by-step
module.exports = env => {
  const ifProd = plugin =>  env.prod ? plugin : undefined;
  const removeEmpty = array => array.filter(p => !!p);

  return {
    /**
     * entry tells webpack where to start looking.
     */
    entry: {
      app: path.join(__dirname, '../src/'),
      vendor: ['react', 'react-dom', 'react-router'],
    },
    /**
     * output tells webpack where to put the files he creates
     * after running all its loaders and plugins.
     *
     * > [name].[hash].js will output something like app.3531f6aad069a0e8dc0e.js
     * > path.join(__dirname, '../build/') will output into a /build folder in
     *   the root of this prject.
     */
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
      path: path.join(__dirname, '../build/'),
    },

    module: {
      // Loaders allow you to preprocess files!
      loaders: [
        {
          test: /\.(js)$/, // look for .js files
          exclude: /node_modules/, // ingore /node_modules
          loader: 'babel-loader' // preprocess with that babel goodness
        },
      ],
    },

    plugins: removeEmpty([
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].[chunkhash].js',
        //minChunks: 'Infinity',
        minChunks: (module, count) => {
          const context = module.context;
          return context && context.indexOf('node_modules') >= 0;
        },
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'app',
        async: 'lodash',
        minChunks(module, count) {
          var context = module.context;
          return context && context.indexOf('node_modules/lodash') >= 0;
        },
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['runtime'],
      }),

      /**
      * HtmlWebpackPlugin will make sure out JavaScriot files are being called
      * from within our index.html
      */
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.html'),
        filename: 'index.html',
        inject: 'body',
      }),

      // Only running UglifyJsPlugin() in production
      ifProd(new webpack.optimize.UglifyJsPlugin({
        compress: {
          'screw_ie8': true,
          'warnings': false,
          'unused': true,
          'dead_code': true,
        },
        output: {
          comments: false,
        },
        sourceMap: false,
      })),

      // Only running webpack analyzer plugin in production
      ifProd(new BundleAnalyzerPlugin()),
    ]),
  };
};
