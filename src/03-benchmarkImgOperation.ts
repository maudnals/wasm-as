import loader from 'assemblyscript/lib/loader';
import { getImgDataArray } from './utils/img.utils';
import benchmark from './utils/benchmark.utils';
import { doubleArrayData } from './02-imgOperation';

fetch('doubleArray.0aceb6d0.wasm')
  .then(bytes => bytes.arrayBuffer())
  .then(buffer => {
    const imgArrData = getImgDataArray('img');
    const wasmModule = loader.instantiateBuffer(<Uint8Array>buffer, {
      env: {}
    });
    const imgArrDataCopy = [...imgArrData];
    console.log(`JS:`, benchmark(jsDoubleArrayData, [imgArrDataCopy]));
    console.log(
      `wasm:`,
      benchmark(doubleArrayData, [wasmModule, imgArrDataCopy])
    );
  });

const jsDoubleArrayData = arrData => {
  for (let i = 0, k = arrData.length; i < k; ++i) {
    arrData[i] *= 2;
  }
  return arrData;
};
