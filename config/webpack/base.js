const Path = require('path');
const PackageJson = require('../../package.json');

module.exports = (mode, example) => {
  const isDev = mode === 'development';
  const isExample = mode === 'example';

  const {version} = PackageJson;
  const entry = (isDev || isExample) ?
    Path.resolve(__dirname, `../../examples/${example}/index.ts`) :
    Path.resolve(__dirname, '../../src/index.ts');
  const output = (isDev || isExample) ? {
    path: Path.resolve(__dirname, '../../docs/examples'),
    filename: `${example}.min.js`,
  } : {
    path: Path.resolve(__dirname, '../../dist'),
    filename: `boardy-${version}.min.js`,
  };

  console.log(`[[ Path ]]\n  entry: ${entry}\n  output: ${output.path}\n  filename: ${output.filename}\n`)

  return {
    mode: isExample ? 'production' : mode,
    entry,
    output,
  };
};
