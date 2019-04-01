console.log('coucou');
import all from './build/optimized.wasm';
import { add } from './build/optimized.wasm';

console.log('all', all);
console.log('add', add(1, 2));
