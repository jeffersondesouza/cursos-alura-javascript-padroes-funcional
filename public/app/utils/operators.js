export const partialize = (fn, ...args) => fn.bind(null, ...args);

// point free
export const compose = (...fns) => value =>
  fns.reduceRight((previousValue, fn) => fn(previousValue), value);

export const pipe = (...fns) => value =>
  fns.reduce((previousValue, fn) => fn(previousValue), value);
