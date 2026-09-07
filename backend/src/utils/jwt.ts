import jwt from 'jsonwebtoken';

/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 * 
 * @param id - The unique user ID from MongoDB
 * @returns A signed JWT string
 */
export const generateToken = (id: string): string => {
  // Use the secret key from environment variables, or a fallback for safety
  const secret = process.env.JWT_SECRET || 'fallback_secret';

  // Sign the token with the user's ID
  // The token will expire in 30 days (this keeps the user logged in for a month)
  return jwt.sign({ id }, secret, {
    expiresIn: '30d',
  });
};
