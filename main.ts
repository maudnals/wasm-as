import { add } from './build/optimized.wasm';
import { substract } from './build/optimized.wasm';
import { multiply } from './build/optimized.wasm';
import { divide } from './build/optimized.wasm';

console.log('add', add(1, 2));
console.log('subtract', substract(1, 2));
console.log('multiply', multiply(1, 2));
console.log('divide', divide(4, 2));
