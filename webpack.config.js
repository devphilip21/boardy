const generateConfig = require('./config/webpack');
const exampleAbbreviation = {
  rtc: 'real-time-communication',
}

module.exports = (_, { v }) =>{
  const argv = Array.isArray(v) ? v : [v];
  const args = argv.map(str => str.split('=').map(keyValue => keyValue.trim()));
  const exampleArg = args.find(([key]) => key === '.example');
  const exampleStr = exampleArg ? exampleArg[1] : 'simple';
  const example = exampleAbbreviation[exampleStr] || exampleStr;

  console.log(`[[ Example ]]\n  - ${example}\n`);

  return generateConfig(
    process.env.NODE_ENV || 'production',
    example
  )
} ;
