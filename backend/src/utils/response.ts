import { Response } from 'express';

/**
 * Standardized API Response format
 * Ensures that the frontend always receives data in a predictable shape.
 */
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Helper function to send a success response
 * 
 * @param res - Express Response object
 * @param statusCode - HTTP status code (e.g., 200, 201)
 * @param message - A descriptive success message
 * @param data - Optional data payload (e.g., user object, list of items)
 */
export const sendSuccess = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any
) => {
  const response: ApiResponse = {
    success: true,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  res.status(statusCode).json(response);
};

/**
 * Helper function to send an error response
 * (Note: Most errors will be caught by the global errorHandler, 
 * but this is useful for controlled, anticipated errors).
 * 
 * @param res - Express Response object
 * @param statusCode - HTTP status code (e.g., 400, 404)
 * @param message - A descriptive error message
 */
export const sendError = (
  res: Response,
  statusCode: number,
  message: string
) => {
  const response: ApiResponse = {
    success: false,
    message,
  };

  res.status(statusCode).json(response);
};
