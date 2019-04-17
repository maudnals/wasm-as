import loader from 'assemblyscript/lib/loader';
import {
  displayImg,
  getImgDataArray,
  toUint8ClampedArr,
  toInt32Arr
} from './utils/img.utils';
import { newImgWrapperEl, btn } from './utils/dom.utils';

btn.addEventListener('click', () => {
  fetch('doubleArray.a508c801.wasm')
    .then(bytes => bytes.arrayBuffer())
    .then(buffer => {
      const imgArrData = getImgDataArray('img');
      const wasmModule = loader.instantiateBuffer(<Uint8Array>buffer, {
        env: {}
      });
      // no need for RGB distinction since *2 is linear
      const doubledImgData = toUint8ClampedArr(
        doubleArrayData(wasmModule, toInt32Arr(imgArrData))
      );
      displayImg(doubledImgData, newImgWrapperEl);
      // console.log('ptr:', ptr);
      // console.log('wasmModule:', wasmModule);
      // console.log('doubledArray:', doubledArray);
    });
});

export function doubleArrayData(wasmModule, imgArrData: Int32Array) {
  // pointer to memory location (in WASM context)
  const ptr = wasmModule.newArray(imgArrData);
  // double all values
  wasmModule.doubleArray(ptr);
  // access the processed array
  const doubledArray = wasmModule.getArray(Int32Array, ptr);
  // free memory in WASM context
  wasmModule.freeArray(ptr);
  return doubledArray;
}
