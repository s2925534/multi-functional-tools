declare module 'file' {
    import { ReadStream, WriteStream } from 'fs';
    
    interface CsvField {
      id: string;
      title: string;
    }
  
    class FileBasic {
      constructor();
  
      writeToFile(
        fileName: string,
        data: string | Record<string, any>[],
        format?: 'json' | 'csv'
      ): boolean;
  
      writeToCSV(fileName: string, list: Record<string, any>[]): void;
  
      getBaseNameOfFile(url: string): string;
  
      deleteDirectoryAndFiles(directory: string): void;
  
      deleteDirectory(directory: string, recursive?: boolean): void;
  
      zipDirectory(srcDir: string, recursive?: boolean): void;
    }
  
    export { FileBasic };
  }
  