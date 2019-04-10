// HTML Elements

export const input1: HTMLInputElement = document.getElementById('input1');
export const input2: HTMLInputElement = document.getElementById('input2');
export const setInput1Value = value => (input1.value = value);
export const setInput2Value = value => (input2.value = value);
export const getInput1Value = () => input1.value;
export const getInput2Value = () => input2.value;

export const sumDivEl: HTMLElement = document.getElementById('sumDiv');

export const display = (el, innerHTML): void => {
  el.innerHTML = innerHTML;
};
