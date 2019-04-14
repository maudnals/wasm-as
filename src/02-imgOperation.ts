import loader from '../node_modules/assemblyscript/lib/loader';
import { displayImage, getImgDataAsArray } from './utils/canvas.utils';
import { editedImageWrapperEl } from './utils/dom.utils';

fetch('doubleArray.0aceb6d0.wasm')
  .then(bytes => bytes.arrayBuffer())
  .then(buffer => {
    const wasmModule = loader.instantiateBuffer(<Uint8Array>buffer, {
      env: {}
    });

    const arrData = getImgDataAsArray('img');

    // pointer to memory location (in WASM context)
    const ptr = wasmModule.newArray(new Int32Array(arrData));
    // double all RGB values (separately but the operation is linear)
    wasmModule.sum(ptr);
    // access the processed array
    const doubledArray = wasmModule.getArray(Int32Array, ptr);
    // free memory in WASM context
    wasmModule.freeArray(ptr);

    displayImage(new Uint8ClampedArray(doubledArray), editedImageWrapperEl);

    console.log('ptr:', ptr);
    console.log('wasmModule:', wasmModule);
    console.log('wasmModule.memory:', wasmModule.memory);
    console.log('doubledArray', doubledArray);
    console.log('doubledArray converted', new Uint8ClampedArray(doubledArray));
  });
