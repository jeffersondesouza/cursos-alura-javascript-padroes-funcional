import { notasService as service } from "./nota/service.js";
import {
  takeUntil,
  debounceTime,
  pipe,
  partialize
} from "./utils/operators.js";

import "./utils/array-helpers.js";

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

const operation = operations(() =>
  service
    .sumItemsByCode("2143")
    .then(console.log)
    .catch(console.log)
);

document.querySelector("#myButton").onclick = operation;
