const debounce = <Argv extends Array<any>>(
  job: (...argv: Argv) => void,
  debounceTime: number,
): (...argv: Argv) => void => {
  if (!debounceTime) {
    return job;
  }

  let lastArgv: Argv;
  let timerId: number = 0;

  const debouncedJob = () => {
    clearTimeout(timerId);
    timerId = 0;
    job(...lastArgv);
  };

  return (...argv: Argv) => {
    lastArgv = argv;

    if (!timerId) {
      timerId = window.setTimeout(debouncedJob, debounceTime);
      job(...lastArgv);
    }
  };
};

export default debounce;
