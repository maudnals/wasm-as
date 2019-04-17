import loader from 'assemblyscript/lib/loader';
import { displayImg, getImgDataArray } from './utils/canvas.utils';
import { newImgWrapperEl, btn } from './utils/dom.utils';

btn.addEventListener('click', () => {
  fetch('doubleArray.0aceb6d0.wasm')
    .then(bytes => bytes.arrayBuffer())
    .then(buffer => {
      const imgArrData = getImgDataArray('img');
      const wasmModule = loader.instantiateBuffer(<Uint8Array>buffer, {
        env: {}
      });
      // no need for RGB distinction since *2 is linear
      const doubledImgData = new Uint8ClampedArray(
        doubleArrayData(wasmModule, imgArrData)
      );
      displayImg(doubledImgData, newImgWrapperEl);
      // console.log(arrData);
      // console.log('ptr:', ptr);
      // console.log('wasmModule:', wasmModule);
      // console.log('wasmModule.memory:', wasmModule.memory);
      // console.log('doubledArray:', doubledArray);
    });
});

export function doubleArrayData(wasmModule, imgArrData: Uint8ClampedArray) {
  // pointer to memory location (in WASM context)
  const ptr = wasmModule.newArray(new Int32Array(imgArrData));
  // double all values
  wasmModule.sum(ptr);
  // access the processed array
  const doubledArray = wasmModule.getArray(Int32Array, ptr);
  // free memory in WASM context
  wasmModule.freeArray(ptr);
  return doubledArray;
}
