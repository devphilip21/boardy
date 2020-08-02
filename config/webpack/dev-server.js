module.exports = (mode) => {
  const isDev = mode === 'development';
  
  if (isDev) {
    return {
      devServer: {
        port: 8000,
      },
    };
  }

  return {};
};
