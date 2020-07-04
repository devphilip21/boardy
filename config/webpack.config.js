const generateConfig = require('./webpack');

module.exports = generateConfig(
  process.env.NODE_ENV || 'production'
);
