import { Request, Response, NextFunction } from 'express';
import FoundItem from '../../models/found-item.model';
import { sendSuccess, sendError } from '../../utils/response';
import { AuthRequest } from '../../middleware/auth';

/**
 * @desc    Create a new found item report
 * @route   POST /api/v1/found-items
 * @access  Private
 */
export const createFoundItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    // Create the found item
    const newFoundItem = await FoundItem.create({
      ...req.body,
      user_id: userId,
    });

    sendSuccess(res, 201, 'Found item reported successfully', newFoundItem);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all found items (with search)
 * @route   GET /api/v1/found-items
 * @access  Public
 */
export const getFoundItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, location, search } = req.query;

    let query: any = { status: 'ACTIVE' };

    if (category) query.category = category;
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { public_description: { $regex: search, $options: 'i' } },
      ];
    }

    // IMPORTANT PRIVACY FEATURE:
    // We use .select('-private_description') to ensure sensitive data
    // is NEVER sent to the frontend during a public search!
    const items = await FoundItem.find(query)
      .select('-private_description')
      .sort({ createdAt: -1 })
      .populate('user_id', 'name phone');

    sendSuccess(res, 200, 'Found items retrieved', items);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single found item by ID
 * @route   GET /api/v1/found-items/:id
 * @access  Public
 */
export const getFoundItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // We still hide the private_description on the individual item view.
    // In the future, this would only be exposed to the matching engine
    // or to admins/verified owners.
    const item = await FoundItem.findById(req.params.id)
      .select('-private_description')
      .populate('user_id', 'name phone');

    if (!item) {
      return sendError(res, 404, 'Found item not found');
    }

    sendSuccess(res, 200, 'Found item retrieved', item);
  } catch (error) {
    next(error);
  }
};
