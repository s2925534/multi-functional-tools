import { Basic } from './basic.js';

export class Web extends Basic {
  constructor() {
    super();
  }

  async getUrlContent(url) {
    const response = await fetch(url);
    const content = await response.text();
    return content;
  }

  stripTagsContent(text, tags = '', invert = false) {
    const regex = tags ? new RegExp(`<(${tags})(\\s|\\S)*?>|<\/(${tags})>`, 'gi') : /<(\w+)(\s|\\S)*?>|<\/(\w+)>/gi;
    return text.replace(regex, '');
  }

  validateURLString(url) {
    return !!url.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/gm);
  }

  async checkUrl(url, returnData = 'code') {
    const response = await fetch(url);
    const data = await response.text();

    if (returnData === 'code') {
      return response.status;
    }

    return data;
  }
}
