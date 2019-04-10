import loader from '../node_modules/assemblyscript/lib/loader';
import {
  canvasToCanvasData,
  drawImgOnCanvas,
  getImgFromArray
} from './utils/canvas.utils';

fetch('optimized.0778a663.wasm')
  .then(bytes => bytes.arrayBuffer())
  .then(buffer => {
    const wasmModule = loader.instantiateBuffer(<Uint8Array>buffer, {
      env: {}
    });

    const img = document.getElementById('img');
    const canvas = drawImgOnCanvas(img);
    const arrData = canvasToCanvasData(canvas);

    // pointer to memory location (in WASM context)
    const ptr = wasmModule.newArray(new Int32Array(arrData));

    wasmModule.sum(ptr);
    const doubledArray = wasmModule.getArray(Int32Array, ptr);

    // directly access the processed array
    const img2 = getImgFromArray(new Uint8ClampedArray(doubledArray), 200, 200);
    document.body.appendChild(img2);
    // free memory in WASM context
    wasmModule.freeArray(ptr);
    console.log('ptr:', ptr);
    console.log('wasmModule:', wasmModule);
    console.log('wasmModule.memory:', wasmModule.memory);
    console.log(img2);
    console.log('doubledArray', doubledArray);
    console.log('doubledArray converted', new Uint8ClampedArray(doubledArray));
  });
