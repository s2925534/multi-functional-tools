import { Basic } from './basic.js';

export class Math extends Basic {
  constructor() {
    super();
  }

  calculateAverageValuesInAnArray(array) {
    return array ? parseFloat(array.reduce((sum, num) => sum + num, 0) / array.length) : 0;
  }

  medianOfAnArray(array) {
    if (array.length === 0) {
      return null;
    }

    const sortedArray = [...array].sort((a, b) => a - b);
    const mid = Math.floor((sortedArray.length - 1) / 2);
    const keys = sortedArray.slice(mid, mid + (sortedArray.length % 2 === 0 ? 2 : 1));
    const sum = keys.reduce((total, key) => total + key, 0);

    return keys.length ? parseFloat(sum / keys.length) : false;
  }

  modeOfAnArray(array) {
    if (array.length === 0) {
      return null;
    }

    // @todo Implement mode calculation logic here
    return null;
  }
}
