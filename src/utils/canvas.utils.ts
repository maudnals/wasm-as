export const imgToCanvasData = img => canvasToCanvasData(drawImgOnCanvas(img));

export const drawImgOnCanvas = img => {
  const CANVAS = document.createElement('canvas');
  CANVAS.id = 'canvas';
  CANVAS.width = img.width;
  CANVAS.height = img.height;
  CANVAS.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
  return CANVAS;
};

export const canvasToCanvasData = canvas =>
  canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;

export const getImgDataAsArray = imgElId => {
  const img = document.getElementById(imgElId);
  const canvas = drawImgOnCanvas(img);
  return canvasToCanvasData(canvas);
};

const getDataUrlFromArray = (arr, w, h) => {
  if (typeof w === 'undefined' || typeof h === 'undefined') {
    w = h = Math.sqrt(arr.length / 4);
  }
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = w;
  canvas.height = h;

  const imgData = ctx.createImageData(w, h);
  imgData.data.set(arr);
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL();
};

const getImgFromDataUrl = data => {
  const img = document.createElement('img');
  img.src = data;
  return img;
};

export const getImgFromArray = (arr, w, h) => {
  return getImgFromDataUrl(getDataUrlFromArray(arr, w, h));
};
