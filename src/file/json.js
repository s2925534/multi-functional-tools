import fs from 'fs';
import { FileBasic } from '@it.specialist/multi-functional-tools/src/file/fileBasic.js';
import { Strings } from './data-type.js';

class Json extends FileBasic {
  constructor() {
    super();
    this.strings = new Strings();
  }

  sqlCase(data) {
    data = JSON.parse(JSON.stringify(data));
    return Object.keys(data).reduce((carry, key) => {
      const sqlKey = this.strings.lccToSql(key);

      if (!Array.isArray(data[key])) {
        carry[sqlKey] = data[key];
      } else {
        carry[sqlKey] = this.sqlCase(data[key]);
      }

      return carry;
    }, {});
  }

  getJsonContent(fileLocation) {
    try {
      const jsonString = fs.readFileSync(fileLocation, 'utf-8');
      return JSON.parse(jsonString);
    } catch (error) {
      return { error: 'Unable to parse JSON file.' };
    }
  }

  convertJsonObjectToArray(jsonObject) {
    return JSON.parse(JSON.stringify(jsonObject));
  }
}

export { Json };
