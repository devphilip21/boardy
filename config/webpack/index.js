const configBase = require('./base');
const configDevServer = require('./dev-server');
const configModule = require('./module');
const configPlugins = require('./plugins');

/**
 * config merge pipe
 * @param {string} mode 
 */
module.exports = (mode) => {
  const isDev = mode === 'development';
  const config = {
    ...configBase(mode, isDev),
    ...configDevServer(mode, isDev),
    ...configModule(mode, isDev),
    ...configPlugins(mode, isDev),
  };

  return config;
};
