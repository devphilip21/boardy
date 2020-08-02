const configBase = require('./base');
const configDevServer = require('./dev-server');
const configModule = require('./module');
const configPlugins = require('./plugins');

/**
 * config merge pipe
 * @param {string} mode
 * @return {any} config
 */
module.exports = (mode, example) => {
  const config = {
    ...configBase(mode, example),
    ...configDevServer(mode),
    ...configModule(mode),
    ...configPlugins(mode, example),
  };

  return config;
};
