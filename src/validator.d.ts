import { Basic } from './basic';

export declare class Validator extends Basic {
  constructor();

  isJson(string: string): boolean;

  isInteger(input: any): boolean;

  isHTML(string: string): boolean;
}
