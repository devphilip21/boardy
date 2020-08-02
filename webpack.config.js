const generateConfig = require('./config/webpack');
const exampleAbbreviation = {
  rtc: 'real-time-communication',
}

module.exports = () =>{
  const exampleArg = process.env.example;
  const exampleStr = exampleArg || 'simple';
  const example = exampleAbbreviation[exampleStr] || exampleStr;

  console.log(`[[ Example ]]\n  - ${example}\n`);

  return generateConfig(
    process.env.NODE_ENV || 'production',
    example
  )
} ;
