const Path = require('path');
const PackageJson = require('../../package.json');

module.exports = (mode, isDev, example) => {
  const {version} = PackageJson;
  const entry = isDev ?
    Path.resolve(__dirname, `../../examples/${example}/index.ts`) :
    Path.resolve(__dirname, '../../src/index.ts');
  const output = {
    path: Path.resolve(__dirname, '../../dist'),
    filename: `boardy-${version}.min.js`,
  };

  return {
    mode,
    entry,
    output,
  };
};
