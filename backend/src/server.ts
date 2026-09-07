import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/database';


import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

// Initialize the Express application
const app: Application = express();

// Connect to the database
connectDB();

// Middleware
// Helmet helps secure Express apps by setting various HTTP headers
app.use(helmet());
// CORS allows our frontend (which might be on a different port/domain) to communicate with this backend
app.use(cors());
// Built-in middleware to parse incoming JSON payloads
app.use(express.json());
// Built-in middleware to parse incoming URL-encoded payloads (like form submissions)
app.use(express.urlencoded({ extended: true }));

import authRoutes from './modules/auth/auth.routes';

// Basic Health Check Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the Lost & Found Ethiopia API',
    status: 'Running'
  });
});

// Mount Routes
app.use('/api/v1/auth', authRoutes);

// Define the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Global Error Handler (must be the last middleware)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode.`);
});
