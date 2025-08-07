const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts', // Entry point for your application
  output: {
    filename: 'main.js', // Output filename
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Clean the output directory before each build
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Match .ts files
        use: 'ts-loader', // Use ts-loader to handle TypeScript
        exclude: /node_modules/, // Exclude node_modules
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Use our custom HTML template
      filename: 'index.html', // Output filename
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve static files from dist
    port: 5000, // Port to run the dev server
    host: '0.0.0.0', // Allow access from external devices
    allowedHosts: 'all', // Allow all hosts
    hot: true, // Enable Hot Module Replacement (HMR)
    open: true, // Automatically open the browser
  },
  mode: 'development', // Set mode to development
  devtool: 'source-map', // Enable source maps for debugging
};
