// HTML Elements

export const input1: HTMLInputElement = document.getElementById('input1');
export const input2: HTMLInputElement = document.getElementById('input2');
export const setInput1Value = (value: number) =>
  (input1.value = <string>(<unknown>value));
export const setInput2Value = (value: number) =>
  (input2.value = <string>(<unknown>value));
export const getInput1Value = (): string => input1.value;
export const getInput2Value = (): string => input2.value;

export const sumDivEl: HTMLElement = document.getElementById('sumDiv');

export const editedImageWrapperEl: HTMLElement = document.getElementById(
  'editedImageWrapper'
);

export const display = (el: HTMLElement, innerHTML: string): void => {
  el.innerHTML = innerHTML;
};
