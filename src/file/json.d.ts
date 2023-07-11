import { FileBasic } from '@it.specialist/my-package/src/file/fileBasic.js';
import { Strings } from './data-type.js';

export declare class Json extends FileBasic {
  constructor();

  sqlCase<T>(data: T): T;
  getJsonContent(fileLocation: string): any;
  convertJsonObjectToArray<T>(jsonObject: T): T;
}
