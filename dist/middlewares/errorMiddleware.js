"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    if (err.logging) {
        //TASK: Implement the Error logging service
    }
    return res.status(err.code || 500).json({ error: err.message });
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map