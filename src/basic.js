export class Basic {
    constructor() {
      this.initResponse();
    }
  
    initResponse() {
      this.helperResponse = {
        status: '',
        message: '',
        data: [],
        code: null,
      };
    }
  
    sample(something = []) {
      return something;
    }
  }
  