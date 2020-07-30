const Path = require('path');
const Fs = require('fs');

module.exports = () => {
  const browsers = Fs
    .readFileSync(Path.resolve(__dirname, '../../.browserslistrc'), {
      encoding: 'utf8',
    })
    .split('\n')
    .map((str) => str.trim())
    .filter((str) => str);

  console.log(`[[ Supported Browsers ]]`);
  browsers.forEach((browser) => {
    console.log(`  - ${browser}`);
  });

  return {
    resolve: {
      alias: {
        '@': Path.resolve(__dirname, '../../src'),
      },
      extensions: ['.mjs', '.js', '.mts', '.ts'],
    },
    module: {
      rules: [
        {
          test: /\.(ts)/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-env', {
                  targets: {browsers},
                },
              ],
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      ],
    },
  };
};
