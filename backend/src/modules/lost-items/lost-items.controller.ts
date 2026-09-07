import { Request, Response, NextFunction } from 'express';
import LostItem from '../../models/lost-item.model';
import { sendSuccess, sendError } from '../../utils/response';
import { AuthRequest } from '../../middleware/auth';
import { nextTick } from 'node:process';

/**
 * @desc    Create a new lost item report
 * @route   POST /api/v1/lost-items
 * @access  Private
 */
export const createLostItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // The user ID comes from the JWT token via our auth middleware
    const userId = req.user?.id;

    // Create the lost item, attaching the user ID
    const newLostItem = await LostItem.create({
      ...req.body,
      user_id: userId,
    });

    sendSuccess(res, 201, 'Lost item reported successfully', newLostItem);
  } catch (error) {
    next(error);
  }
};
/**
 * @desc    Get all lost items (with basic search)
 * @route   GET /api/v1/lost-items
 * @access  Public
 */
export const getLostItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, location, search } = req.query;

    // Build a dynamic query object based on the filters provided
    let query: any = { status: 'ACTIVE' }; // Default: only show active lost items

    if (category) query.category = category;
    if (location) {
      // Basic text search for location (case-insensitive)
      query.location = { $regex: location, $options: 'i' };
    }
    if (search) {
      // Search in title or description
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Fetch items from DB, sort by newest first, and populate the user's name
    const items = await LostItem.find(query)
      .sort({ createdAt: -1 })
      .populate('user_id', 'name phone');

    sendSuccess(res, 200, 'Lost items retrieved', items);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single lost item by ID
 * @route   GET /api/v1/lost-items/:id
 * @access  Public
 */
export const getLostItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await LostItem.findById(req.params.id).populate(
      'user_id',
      'name phone'
    );

    if (!item) {
      return sendError(res, 404, 'Lost item not found');
    }

    sendSuccess(res, 200, 'Lost item retrieved', item);
  } catch (error) {
    next(error);
  }
};
