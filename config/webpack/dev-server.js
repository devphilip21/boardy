module.exports = (_, isDev) => {
  if (isDev) {
    return {
      devServer: {
        port: 8000,
      },
    };
  }

  return {};
};
