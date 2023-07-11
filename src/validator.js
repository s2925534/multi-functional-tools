import { Basic } from './basic.js';

export class Validator extends Basic {
  constructor() {
    super();
  }

  isJson(string) {
    try {
      JSON.parse(string);
      return true;
    } catch (error) {
      return false;
    }
  }

  isInteger(input) {
    return Number.isInteger(input);
  }

  isHTML(string) {
    return string !== stripTags(string);
  }
}
