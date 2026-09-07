import { Request, Response, NextFunction } from 'express';

// Standardized Error Response format
export interface ErrorResponse {
  message: string;
  stack?: string;
  errors?: any;
}

/**
 * Global Error Handler Middleware
 * Catches all errors thrown in the application and formats them consistently.
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Determine the status code (default to 500 Internal Server Error if not set)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode);

  const response: ErrorResponse = {
    message: err.message || 'Server Error',
  };

  // If it's a Mongoose validation error, attach the specific field errors
  if (err.name === 'ValidationError') {
    res.status(400); // Bad Request
    response.message = 'Validation Error';
    response.errors = err.errors;
  }

  // Only include the stack trace if we are in development mode for security
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.json(response);
};
