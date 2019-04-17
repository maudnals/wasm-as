import loader from 'assemblyscript/lib/loader';
import { displayImage, getImgDataArray } from './utils/canvas.utils';
import { newImgWrapperEl, btn } from './utils/dom.utils';

btn.addEventListener('click', () => {
  fetch('doubleArray.0aceb6d0.wasm')
    .then(bytes => bytes.arrayBuffer())
    .then(buffer => {
      const arrData = getImgDataArray('img');

      const wasmModule = loader.instantiateBuffer(<Uint8Array>buffer, {
        env: {}
      });
      // pointer to memory location (in WASM context)
      const ptr = wasmModule.newArray(new Int32Array(arrData));
      // double all RGB values (separately but the operation is linear)
      wasmModule.sum(ptr);
      // access the processed array
      const doubledArray = wasmModule.getArray(Int32Array, ptr);
      // free memory in WASM context
      wasmModule.freeArray(ptr);

      displayImage(new Uint8ClampedArray(doubledArray), newImgWrapperEl);

      console.log(arrData);
      console.log('ptr:', ptr);
      console.log('wasmModule:', wasmModule);
      console.log('wasmModule.memory:', wasmModule.memory);
      console.log('doubledArray:', doubledArray);
    });
});
