import { Basic } from '../basic';

export declare class Regex extends Basic {
  constructor();

  lookaheadNumeric: string;
  lookaheadSymbol: string;
  lookaheadUpper: string;
  lookaheadLower: string;
  lookaheadNonControl: string;
  numeric: string;
  upper: string;
  lower: string;
  lookaheadAlphaUpper: string;
  lookaheadAlphaLower: string;
  symbol: string;
  alphaUpper: string;
  alphaLower: string;

  getRegexNonControl(min?: number, max?: number): string;
  getRegexForNumeric(lookahead?: boolean): string;
  getRegexForUpper(lookahead?: boolean): string;
  getRegexForLower(lookahead?: boolean): string;
  getRegexForSymbol(lookahead?: boolean): string;
  getRegexForAlphaUpper(lookahead?: boolean): string;
  getRegexForAlphaLower(lookahead?: boolean): string;
}
