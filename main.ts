console.log('coucou');
import { add } from './build/optimized.wasm';

console.log('add', add(1, 2));
