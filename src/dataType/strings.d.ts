declare class Strings {
    replaceCharByCharAndLowerCamelCase(string: string, from?: string, to?: string): string;
    convertCamelCaseToSentenceString(str: string): string;
    convertCamelCaseToSnakeCase(input: string): string;
    convertSnakeCaseToCamelCase(input: string): string;
    transformStringToEnglishCharacters(str: string): string;
    transformStringToCase(field: string, toCase?: 'lower' | 'upper'): string | null;
    verifyIfStringContainsString(originalString: string, needleString: string, checkCase?: boolean): boolean;
  }
  
  export { Strings };
  