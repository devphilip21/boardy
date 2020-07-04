const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (_, isDev) => {
  if (isDev) {
    return {
      plugins: [
        new HtmlWebpackPlugin({
          template: Path.resolve(__dirname, './template.html')
        }),
      ],
    };
  }

  return {
    optimization: {
      minimizer: [
        new UglifyJsPlugin()
      ],
    },
  };
};
