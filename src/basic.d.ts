export declare class Basic {
    constructor();
  
    helperResponse: {
      status: string;
      message: string;
      data: any[];
      code: number | null;
    };
  
    initResponse(): void;
  
    sample(something?: any[]): any[];
  }
  