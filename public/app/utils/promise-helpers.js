export const handleStatus = res =>
  res.ok ? res.json() : Promise.reject(res.statusText);

export const log = valor => {
  console.log(valor);
  return valor;
};
