import { Router } from 'express';
import {
  createFoundItem,
  getFoundItems,
  getFoundItemById,
} from './found-items.controller';
import { protect } from '../../middleware/auth';

const router = Router();

// Public routes (anyone can search and view public details of found items)
router.get('/', getFoundItems);
router.get('/:id', getFoundItemById);

// Private routes (you must be logged in to report a found item)
router.post('/', protect, createFoundItem);

export default router;
