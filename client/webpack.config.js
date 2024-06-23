const CopyPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');


module.exports = {
  entry: './src/app.ts',
  output: {
    publicPath: '/assets/',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new DuplicatePackageCheckerPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/lit/**/*.js'
        },
        {
          from: 'node_modules/@webcomponents/webcomponentsjs/**/*.js',
        },
      ],
    }),
    new LiveReloadPlugin(
      {
        protocol: 'https',
        hostname: 'localhost',
        port: 35729,
      })
  ],
};
