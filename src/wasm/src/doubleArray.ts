import 'allocator/tlsf';
export { memory };

export function doubleArray(arr: Int32Array): void {
  // mutate array directly
  for (let i = 0, k = arr.length; i < k; ++i) {
    arr[i] *= 2;
  }
}
