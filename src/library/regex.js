import { Basic } from '../basic.js';

export class Regex extends Basic {
  constructor() {
    super();
    this.lookaheadNumeric = '(?=.*?\\p{N})';
    this.lookaheadSymbol = '(?=.*?[\\p{S}\\p{P} ]';
    this.lookaheadUpper = '(?=.*?\\p{Lu})';
    this.lookaheadLower = '(?=.*?\\p{Ll})';
    this.lookaheadNonControl = '';
    this.numeric = '[\\d!$%^&]';
    this.upper = '[\\d!$%^&]';
    this.lower = '[\\d!$%^&]';
    this.lookaheadAlphaUpper = '([A-Z])';
    this.lookaheadAlphaLower = '([a-z])';
    this.symbol = '';
    this.alphaUpper = '[A-Z]';
    this.alphaLower = '[a-z]';
  }

  getRegexNonControl(min = 8, max = 16) {
    return '[^\\p{C}]{' + min + ',' + max + '}';
  }

  getRegexForNumeric(lookahead = false) {
    return lookahead ? this.lookaheadNumeric : this.numeric;
  }

  getRegexForUpper(lookahead = false) {
    return lookahead ? this.lookaheadUpper : this.upper;
  }

  getRegexForLower(lookahead = false) {
    return lookahead ? this.lookaheadLower : this.lower;
  }

  getRegexForSymbol(lookahead = true) {
    return lookahead ? this.lookaheadSymbol : this.symbol;
  }

  getRegexForAlphaUpper(lookahead = true) {
    return lookahead ? this.lookaheadAlphaUpper : this.alphaUpper;
  }

  getRegexForAlphaLower(lookahead = true) {
    return lookahead ? this.lookaheadAlphaLower : this.alphaLower;
  }
}
