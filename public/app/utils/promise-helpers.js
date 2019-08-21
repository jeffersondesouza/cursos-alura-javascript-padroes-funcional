export const handleStatus = res =>
  res.ok ? res.json() : Promise.reject(res.statusText);

export const log = valor => {
  console.log(valor);
  return valor;
};

export const timeoutPromise = (miliseconds, promise) => {
  const timeOut = new Promise((resolve, reject) =>
    setTimeout(
      () => reject(`Limite da Promise em milisegundos ${miliseconds}`),
      miliseconds
    )
  );

  return Promise.race([promise, timeOut]);
};

export const delay = milliseconds => data =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(data), milliseconds)
  );

export const retry = (times, miliseconds, fn) =>
  fn().catch(err => {
    console.log(times);
    return delay(miliseconds)().then(() =>
      times-- > 1 ? retry(times--, miliseconds, fn) : Promise.reject(err)
    );
  });
