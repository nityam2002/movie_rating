"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// userRoutes.ts
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.post('/signup', userController_1.default.signUp);
router.post('/signin', userController_1.default.signIn);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map