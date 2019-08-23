import { notasService as service } from "./nota/service.js";
import {
  takeUntil,
  debounceTime,
  pipe,
  partialize
} from "./utils/operators.js";

import "./utils/array-helpers.js";
import { timeoutPromise, retry } from "./utils/promise-helpers.js";
import { EventEmmiter } from "./utils/event-emmiter.js";
import { Maybe } from "./utils/maybe.js";

const maybe = Maybe.of(null)
  .map(value => value + 10)
  .map(value => value + 10)
  .map(value => value + 10)
  .get(0);

console.log(maybe);

const textToArray = text => Array.from(text);
const arrayToText = array => array.join("");

const textToArrayMonad = textM => textM.map(textToArray);
const arrayToTextMonad = arrayM => arrayM.map(arrayToText);

const text = textToArrayMonad(Maybe.of(null)).get([]);
console.log(text);

const array = arrayToTextMonad(Maybe.of([1, 2, 3, 4, 54])).get("");
console.log(array);

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

const action = operations(() =>
  retry(3, 1000, () => timeoutPromise(1000, service.sumItemsByCode("2143")))
    .then(total => EventEmmiter.emit("itensTotalizados", total))
    .catch(console.log)
);

document.querySelector("#myButton").onclick = action;
