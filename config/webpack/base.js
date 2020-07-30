const Path = require('path');
const PackageJson = require('../../package.json');

module.exports = (mode, isDev) => {
  const {version} = PackageJson;

  return {
    mode,
    entry: isDev ?
      Path.resolve(__dirname, '../../src/index.example.ts') :
      Path.resolve(__dirname, '../../src/index.ts'),
    output: {
      path: Path.resolve(__dirname, '../../dist'),
      filename: `boardy-${version}.min.js`,
    },
  };
};
