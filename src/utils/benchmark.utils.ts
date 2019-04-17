const DEFAULT_ITERATION_COUNT = 10;

export default (
  func: Function,
  args: Array<any>,
  iterationCount: number = DEFAULT_ITERATION_COUNT
) => {
  const start: number = performance.now();
  for (let i = 0; i < iterationCount; i++) {
    func(...args);
  }
  const finish: number = performance.now();
  return (finish - start) / DEFAULT_ITERATION_COUNT;
};
