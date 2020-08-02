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
  const isDev = mode === 'development';
  const config = {
    ...configBase(mode, isDev, example),
    ...configDevServer(mode, isDev),
    ...configModule(mode, isDev),
    ...configPlugins(mode, isDev, example),
  };

  return config;
};
