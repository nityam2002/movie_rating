// UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { ValidationError } from '../errors/CustomError';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Movie',
  password: 'nityam@1492',
  port: 5432,
});

const SECRET_KEY = 'your-secret-key'; // Replace with your actual secret key

class UserController {
  static async signUp(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new ValidationError('Username and password are required!');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user data to the database
      const result = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
        [username, hashedPassword]
      );

      return res.json({ success: true, message: 'User signed up successfully', userId: result.rows[0].id });
    } catch (error) {
      return res.status(error.code || 500).json({ error: error.message });
    }
  }

  static async signIn(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
   
      if (!username || !password) {
        throw new ValidationError('Username and password are required!');
      }

      // Retrieve user data from the database
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];

      if (!user || !(await bcrypt.compare(password, user.password))) {

        throw new ValidationError('Invalid username or password');
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: '1h', // Token expiration time
      });

      return res.json({ success: true, token });
    } catch (error) {
        console.log(error)
      return res.status(error?.code || 500).json({ error: error.message });
    }
  }
}

export default UserController;
