const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (_, isDev, example) => {
  if (isDev) {
    return {
      plugins: [
        new HtmlWebpackPlugin({
          template: Path.resolve(__dirname, `../../examples/${example}/index.html`),
        }),
      ],
    };
  }

  return {
    optimization: {
      minimizer: [
        new UglifyJsPlugin(),
      ],
    },
  };
};
