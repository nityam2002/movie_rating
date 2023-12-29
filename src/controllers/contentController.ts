// UserController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { Pool } from 'pg';
import { ValidationError } from '../errors/customError';

class contentController {
    static async create(req: Request, res: Response) {
      try {
        // const {name, }
  
        return res.json({ success: true, message: 'User signed up successfully' });
      } catch (error) {
        return res.status(error.code || 500).json({ error: error.message });
      }
    }}

export default contentController;