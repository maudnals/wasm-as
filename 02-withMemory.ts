import loader from './node_modules/assemblyscript/lib/loader';

fetch('optimized.0778a663.wasm')
  .then(bytes => bytes.arrayBuffer())
  .then(buffer => {
    const wasmModule = loader.instantiateBuffer(<Uint8Array>buffer, {
      env: {}
    });

    const calcNums = new Int32Array([1, 2, 3, 4, 5, 0x7fffffff]);

    console.log('Input array data to be summed:', calcNums);

    // the pointer points to the memory location in WASM context
    const ptr = wasmModule.newArray(calcNums);

    console.log('ptr:', ptr);
    console.log('wasmModule:', wasmModule);
    console.log('wasmModule.memory:', wasmModule.memory);

    // call the WASM module to execute the processing
    wasmModule.sum(ptr);

    // make sure you provide the same TypedArray subclass constructor like in line 15
    const expectedSummedArray = wasmModule.getArray(Int32Array, ptr);

    // directly access the processed array
    console.log('expectedSummedInt32Array', expectedSummedArray);

    // free memory in WASM context
    wasmModule.freeArray(ptr);
  });
