"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
// CustomError.ts
class CustomError extends Error {
    constructor({ code, message, logging }) {
        super(message);
        this.code = code;
        this.logging = logging;
    }
}
class ValidationError extends CustomError {
    constructor(message) {
        super({ code: 400, message, logging: true });
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
exports.default = CustomError;
//# sourceMappingURL=customError.js.map