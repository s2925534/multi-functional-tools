declare module 'js-yaml' {
    export function load(yamlString: string): any;
  }
  
  declare class YamlManipulation {
    constructor();
    sqlCase(data: any): any;
    transformYamlToArray(yamlString: string): any[];
  }
  
  export default YamlManipulation;
  