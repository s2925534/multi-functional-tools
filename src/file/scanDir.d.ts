export declare class ScanDir {
    static directories: string[];
    static files: string[];
    static extFilter: string[];
    static recursive: boolean;
  
    static scan(dirpath: string | string[], extensions: string | string[], recursive?: boolean): string[];
    static verifyPaths(paths: string[]): void;
    static findContents(dir: string): string[];
  }
  