const memoize = (fn: Function) => {
  const cache: { [key: string]: any } = {};
  return (...args: any[]) => {
    const key = JSON.stringify(args);
    return key in cache ? cache[key] : (cache[key] = fn.apply(null, args));
  };
};

export default memoize;
