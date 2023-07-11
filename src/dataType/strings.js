import { Regex } from './regex';

class Strings {
  constructor() {
    this.regexLibrary = new Regex();
  }

  /**
   * Converts string with a char specified for replacement by another char
   * and set string to lowerCamelCase
   * i.e.: desktop-computer-aparatues
   * specify - (dash) to be replaced by _ and the results will be
   * desktop
   * @param {string} string - The input string
   * @param {string} from - The char to replace
   * @param {string} to - The replacement char
   * @returns {string} The modified string
   */
  replaceCharByCharAndLowerCamelCase(string, from = '-', to = '_') {
    const i = [from, to];
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    string = string.replace(/[^a-zA-Z0-9\-_ ]+/g, '');
    string = string.replace(new RegExp(i.join('|'), 'g'), ' ');
    string = string.replace(/ /g, '');
    string = string.toLowerCase().charAt(0) + string.slice(1);
    return string;
  }

  /**
   * Transform Camel Case string
   * @param {string} str - The input string in camel case
   * @returns {string} The converted string with underscore separated words
   */
  convertCamelCaseToSentenceString(str) {
    str = str.replace(/([a-z])([A-Z])/g, '$1_$2');
    return str.toLowerCase();
  }

  /**
   * @param {string} input - The input string in camel case
   * @returns {string} The converted string in snake case
   */
  convertCamelCaseToSnakeCase(input) {
    return input.replace(/(?<!^)[A-Z]/g, match => '_' + match.toLowerCase());
  }

  /**
   * @param {string} input - The input string in snake case
   * @returns {string} The converted string in camel case
   */
  convertSnakeCaseToCamelCase(input) {
    return input.replace(/_./g, match => match.charAt(1).toUpperCase());
  }

  /**
   * Convert string given to English characters. Remove accents, symbols, etc.
   * @param {string} str - The input string
   * @returns {string} The transformed string with English characters
   */
  transformStringToEnglishCharacters(str) {
    const search = 'ç,Ã§,æ,œ,á,é,í,ó,ú,à,è,ì,ò,ù,ä,ã,ë,ï,ö,ü,ÿ,â,ê,î,ô,û,å,ø,Ø,Å,Á,À,Â,Ä,Ã,È,É,Ê,Ë,Í,Î,Ï,Ì,Ò,Ó,Ô,Ö,Ú,Ù,Û,Ü,Ÿ,Ç,Æ,Œ';
    const replace = 'c,c,ae,oe,a,e,i,o,u,a,e,i,o,u,a,a,e,i,o,u,y,a,e,i,o,u,a,o,O,A,A,A,A,A,A,E,E,E,E,I,I,I,I,O,O,O,O,U,U,U,U,Y,C,AE,OE';
    const searchArr = search.split(',');
    const replaceArr = replace.split(',');
    const searchReplaceMap = new Map();
    searchArr.forEach((val, index) => searchReplaceMap.set(val, replaceArr[index]));
    const regex = new RegExp([...searchReplaceMap.keys()].join('|'), 'g');
    return str.replace(regex, matched => searchReplaceMap.get(matched));
  }

  /**
   * @param {string} field - The input string
   * @param {string} toCase - The desired case ('lower' or 'upper')
   * @returns {string|null} The transformed string
   */
  transformStringToCase(field, toCase = 'lower') {
    if (field) {
      if (toCase === 'lower') {
        field = field.toLowerCase();
      } else if (toCase === 'upper') {
        field = field.toUpperCase();
      }
    } else {
      field = null;
    }
    return field;
  }

  /**
   * @param {string} originalString - The original string
   * @param {string} needleString - The string to search for
   * @param {boolean} checkCase - Whether to perform a case-sensitive search
   * @returns {boolean} Whether the original string contains the needle string
   */
  verifyIfStringContainsString(originalString, needleString, checkCase = false) {
    if (checkCase) {
      return originalString.includes(needleString);
    } else {
      return originalString.toLowerCase().includes(needleString.toLowerCase());
    }
  }
}

export { Strings };
