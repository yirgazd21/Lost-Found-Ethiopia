import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

// Extend the Express Request interface to include our User
export interface AuthRequest extends Request {
  user?: IUser;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get the token from the header (format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'fallback_secret'
      ) as { id: string };

      // Find the user in the database by the decoded ID (excluding the password)
      const user = await User.findById(decoded.id).select('-password_hash');

      if (!user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      // Attach the user object to the request so other routes can use it
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      next(new Error('Not authorized, token failed'));
    }
  }

  if (!token) {
    res.status(401);
    next(new Error('Not authorized, no token provided'));
  }
};
