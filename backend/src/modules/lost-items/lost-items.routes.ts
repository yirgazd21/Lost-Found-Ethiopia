import { Router } from 'express';
import {
  createLostItem,
  getLostItems,
  getLostItemById,
} from './lost-items.controller';
import { protect } from '../../middleware/auth';

const router = Router();

// Public routes (anyone can search and view lost items)
router.get('/', getLostItems);
router.get('/:id', getLostItemById);

// Private routes (you must be logged in to report a lost item)
// We add the `protect` middleware before the controller function
router.post('/', protect, createLostItem);

export default router;
