/* Canvas utils:
Draw on canvas, get/set image data */

// DOM commands

const createCanvas = (w: number, h: number): HTMLCanvasElement => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  return canvas;
};

const drawImgOnCanvas = (img: HTMLImageElement): HTMLCanvasElement => {
  const canvas: HTMLCanvasElement = createCanvas(img.width, img.height);
  canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
  return canvas;
};

export const displayImage = (
  arr: Uint8ClampedArray,
  mountEl: HTMLElement
): void => {
  // arr is a flatten version of all rgba values ie *4
  // .sqrt since img is supposed to be square
  const imgDataLength = Math.sqrt(arr.length / 4);
  const img = getImgFromArray(
    new Uint8ClampedArray(arr),
    imgDataLength,
    imgDataLength
  );
  mountEl.appendChild(img);
};

// Data get/set/transform

const canvasToCanvasData = (canvas: HTMLCanvasElement) =>
  canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;

export const getImgDataAsArray = (imgElId: string): Uint8ClampedArray => {
  const img: HTMLImageElement = <HTMLImageElement>(
    document.getElementById(imgElId)
  );
  const canvas: HTMLCanvasElement = drawImgOnCanvas(img);
  return canvasToCanvasData(canvas);
};

const getDataURLFromArray = (arr, w, h) => {
  if (typeof w === 'undefined' || typeof h === 'undefined') {
    w = h = Math.sqrt(arr.length / 4);
  }
  // create canvas and fill it with image data
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(w, h);
  imgData.data.set(arr);
  ctx.putImageData(imgData, 0, 0);
  // transform img data into url
  return canvas.toDataURL();
};

const getImgFromDataURL = data => {
  const img = document.createElement('img');
  img.src = data;
  return img;
};

export const getImgFromArray = (arr, w, h) => {
  return getImgFromDataURL(getDataURLFromArray(arr, w, h));
};
