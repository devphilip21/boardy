export const tenToThePowerOf = (n: number): number => {
  let result = 1;

  for (let i = 0; i < n; ++i) {
    result *= 10;
  }

  return result;
};
