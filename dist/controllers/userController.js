"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pg_1 = require("pg");
const customError_1 = require("../errors/customError");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'movierate',
    password: 'nityam@1492',
    port: 5432,
});
const SECRET_KEY = 'your-secret-key'; // Replace with your actual secret key
class userController {
    static async signUp(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                throw new customError_1.ValidationError('Username and password are required!');
            }
            // Hash the password
            const hashedPassword = await bcryptjs_1.default.hash(password, 10);
            // Save user data to the database
            // const result = await pool.query(
            //   'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
            //   [username, hashedPassword]
            // );
            const result = await prisma.user.create({ data: { username: username, password: hashedPassword } });
            return res.json({ success: true, message: 'User signed up successfully', userId: result.id });
        }
        catch (error) {
            return res.status(error.code || 500).json({ error: error.message });
        }
    }
    static async signIn(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                throw new customError_1.ValidationError('Username and password are required!');
            }
            // Retrieve user data from the database
            // const result = await pool.query('SELECT * FROM User WHERE public.name = $1', [username]);
            const result = await prisma.user.findFirst({ where: { username: username } });
            console.log(result);
            const user = result;
            if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
                throw new customError_1.ValidationError('Invalid username or password');
            }
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
                expiresIn: '1h', // Token expiration time
            });
            return res.json({ success: true, token });
        }
        catch (error) {
            console.log(error);
            return res.status(error?.ifri || 500).json({ error: error });
        }
    }
}
exports.default = userController;
//# sourceMappingURL=userController.js.map