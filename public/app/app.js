import { notasService as service } from "./nota/service.js";
import {
  takeUntil,
  debounceTime,
  pipe,
  partialize
} from "./utils/operators.js";

import "./utils/array-helpers.js";
import { timeoutPromise, retry } from "./utils/promise-helpers.js";

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

const operation = operations(() =>
  retry(3, 1000, () => timeoutPromise(1000, service.sumItemsByCode("2143")))
    .then(console.log)
    .catch(console.log)
);

document.querySelector("#myButton").onclick = operation;
