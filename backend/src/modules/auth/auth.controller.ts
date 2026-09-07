import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import User from '../../models/user.model';
import { generateToken } from '../../utils/jwt';
import { sendSuccess, sendError } from '../../utils/response';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, phone, email, password } = req.body;

    // 1. Validate required fields
    if (!name || !phone || !password) {
      return sendError(res, 400, 'Please provide name, phone, and password');
    }

    // 2. Check if a user with this phone already exists
    const userExists = await User.findOne({ phone });
    if (userExists) {
      return sendError(res, 400, 'User with this phone number already exists');
    }

    // 3. Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new user in the database
    const user = await User.create({
      name,
      phone,
      email,
      password_hash: hashedPassword,
    });

    // 5. Send success response with token and user data (excluding password)
    if (user) {
      sendSuccess(res, 201, 'User registered successfully', {
        _id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      sendError(res, 400, 'Invalid user data received');
    }
  } catch (error) {
    // Pass unexpected errors to our global errorHandler
    next(error);
  }
};

/**
 * @desc    Authenticate a user & get token
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone, password } = req.body;

    // 1. Check for phone and password
    if (!phone || !password) {
      return sendError(res, 400, 'Please provide phone and password');
    }

    // 2. Find the user by phone number
    const user = await User.findOne({ phone });

    // 3. Check if user exists AND password matches the hashed password in DB
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      sendSuccess(res, 200, 'Login successful', {
        _id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      sendError(res, 401, 'Invalid phone number or password');
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate with Google OAuth
 * @route   POST /api/v1/auth/google
 * @access  Public
 */
export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return sendError(res, 400, 'Google credential token is required');
    }

    // Verify the Google token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return sendError(res, 400, 'Invalid Google token payload');
    }

    const { email, name, sub: google_id } = payload;

    // Check if user already exists
    let user = await User.findOne({ 
      $or: [{ google_id }, { email }]
    });

    if (user) {
      // Link google_id if missing but emails match
      if (!user.google_id) {
        user.google_id = google_id;
        await user.save();
      }
    } else {
      // Create new user (phone and password_hash are optional now)
      user = await User.create({
        name,
        email,
        google_id,
        // Since phone is missing, we could generate a placeholder or leave it blank
      });
    }

    sendSuccess(res, 200, 'Google Login successful', {
      _id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });

  } catch (error) {
    next(error);
  }
};
