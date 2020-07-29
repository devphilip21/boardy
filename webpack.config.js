const generateConfig = require('./config/webpack');

module.exports = generateConfig(
  process.env.NODE_ENV || 'production',
);
