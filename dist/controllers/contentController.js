"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class contentController {
    static async create(req, res) {
        try {
            // const {name, }
            return res.json({ success: true, message: 'User signed up successfully' });
        }
        catch (error) {
            return res.status(error.code || 500).json({ error: error.message });
        }
    }
}
exports.default = contentController;
//# sourceMappingURL=contentController.js.map