const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (mode, example) => {
  const config = {};
  const isDev = mode === 'development';
  const isExample = mode === 'example';

  if (isDev) {
    config.plugins = [
      new HtmlWebpackPlugin({
        template: Path.resolve(__dirname, `../../examples/${example}/index.html`),
      }),
    ];
  } else if (isExample) {
    config.plugins = [
      new HtmlWebpackPlugin({
        filename: `${example}.html`,
        template: Path.resolve(__dirname, `../../examples/${example}/index.html`),
      }),
    ];
  }

  if (!isDev) {
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin(),
      ],
    }
  }
  
  return config;
};
