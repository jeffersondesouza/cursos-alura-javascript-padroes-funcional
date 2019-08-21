import { handleStatus } from "../utils/promise-helpers.js";
import { partialize, compose, pipe } from "../utils/operators.js";

const API = "http://localhost:3000/notass";

const getItemFromNotas = notas => notas.$flatMap(nota => nota.itens);

const filterItensByCode = (code, notas) =>
  notas.filter(item => item.codigo === code);

const getItensValue = notas => notas.map(item => item.valor);

const sumItensValue = notas => notas.reduce((t, a) => t + a, 0);

export const notasService = {
  listAll() {
    return fetch(API)
      .then(handleStatus)
      .catch(err => {
        console.log(err);
        return Promise.reject("Não foi possível obter as notas fiscais");
      });
  },
  sumItemsByCode(code) {
    const filterItens = partialize(filterItensByCode, code);

    const sumItens = pipe(
      getItemFromNotas,
      filterItens,
      getItensValue,
      sumItensValue
    );

    return this.listAll().then(sumItens);
  }
};
