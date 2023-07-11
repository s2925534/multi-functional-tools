declare module 'xml2js' {
    export function parseString(xml: string, callback: (err: Error, result: any) => void): void;
  }
  
  declare class XmlManipulation {
    constructor();
    parseXMLToJson(reference: string): string;
    isValidXmlContent(content: string): boolean;
    cleanXMLContent(content: string): any;
    xmlToJson(xml: any): any;
    convertXMLToCSV(xml: any, input: any): void;
  }
  
  export default XmlManipulation;
  