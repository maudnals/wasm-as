import {
  display,
  getInput1Value,
  getInput2Value,
  sumDivEl
} from './utils/dom.utils';
import { add } from './wasm/build/optimized2.wasm';

display(sumDivEl, add(getInput1Value(), getInput2Value()));
