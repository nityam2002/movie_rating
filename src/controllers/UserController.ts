// UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { ValidationError } from '../errors/customError';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'movierate',
  password: 'nityam@1492',
  port: 5432,
});

const SECRET_KEY = 'your-secret-key'; // Replace with your actual secret key

class userController {
  static async signUp(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new ValidationError('Username and password are required!');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user data to the database
      // const result = await pool.query(
      //   'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      //   [username, hashedPassword]
      // );
      // const result = await prisma.user.create({data:{username:username, password:hashedPassword}});

      return res.json({ success: true, message: 'User signed up successfully' });
      // return res.json({ success: true, message: 'User signed up successfully', userId: result.id });
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
      // const result = await pool.query('SELECT * FROM User WHERE public.name = $1', [username]);
      // const result = await prisma.user.findFirst({where:{username:username}});
      
      console.log();
      const user = {id:'efse', password,username};

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
      return res.status(error?.ifri || 500).json({ error: error });
    }
  }
}

export default userController;
