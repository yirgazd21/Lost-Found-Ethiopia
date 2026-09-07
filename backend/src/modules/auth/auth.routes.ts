import { Router } from 'express';
import { registerUser, loginUser } from './auth.controller';

const router = Router();

// Map the URL paths to our controller functions
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
