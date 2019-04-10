import {
  display,
  getInput1Value,
  getInput2Value,
  sumDivEl
} from './html.helper';
import { add } from './wasm/build/optimized2.wasm';

display(sumDivEl, add(getInput1Value(), getInput2Value()));
