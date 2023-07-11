import { Basic } from './basic';

export declare class Web extends Basic {
  constructor();

  getUrlContent(url: string): Promise<string>;

  stripTagsContent(text: string, tags?: string, invert?: boolean): string;

  validateURLString(url: string): boolean;

  checkUrl(url: string, returnData?: 'code' | 'data'): Promise<number | string>;
}
