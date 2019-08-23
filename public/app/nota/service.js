import { handleStatus } from "../utils/promise-helpers.js";
import { partialize, compose, pipe } from "../utils/operators.js";
import { Maybe } from "../utils/maybe.js";

const API = "http://localhost:3000/notas";

const getItemFromNotas = notas => notas.$flatMap(nota => nota.itens);
const filterItensByCode = code => notas =>
  notas.filter(item => item.codigo === code);
const getItensValue = notas => notas.map(item => item.valor);
const sumItensValue = notas => notas.reduce((t, a) => t + a, 0);

const getItemFromNotasMonad = notasM => {
  console.log("notasM:", notasM);

  return notasM.map(getItemFromNotas);
};

const filterItensMonad = code => notasM => {
  console.log("notasM:", notasM);
  return notasM.map(filterItensByCode(code));
};

const getItensValueMonad = notasM => notasM.map(getItensValue);
const sumItensValueMonad = notasM => notasM.map(sumItensValue);

export const notasService = {
  listAll() {
    return fetch(API)
      .then(handleStatus)
      .then(notas => Maybe.of(notas))
      .catch(err => {
        console.log(err);
        return Promise.reject("Não foi possível obter as notas fiscais");
      });
  },
  sumItemsByCode(code) {
    const sumItens = pipe(
      getItemFromNotasMonad,
      filterItensMonad(code),
      getItensValueMonad,
      sumItensValueMonad
    );

    return this.listAll()
      .then(sumItens)
      .then(result => {
        return result.get(0);
      });
  }
};
