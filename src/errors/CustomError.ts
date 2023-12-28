// CustomError.ts
class CustomError extends Error {
    public code: number;
    public logging: boolean;
  
    constructor({ code, message, logging }: { code: number; message: string; logging: boolean }) {
      super(message);
      this.code = code;
      this.logging = logging;
    }
  }
  
  export class ValidationError extends CustomError {
    constructor(message: string) {
      super({ code: 400, message, logging: true });
      this.name = 'ValidationError';
    }
  }
  

  
  export default CustomError;
  