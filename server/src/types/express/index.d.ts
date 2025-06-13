import { Express } from 'express-serve-static-core';
import mongoose from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: mongoose.Types.ObjectId | string;
        role?: string;
      };
    }
  }
}
