import { Request, Response } from 'express';
import User from '../../models/user.model';
import LostItem from '../../models/lost-item.model';
import FoundItem from '../../models/found-item.model';
import { sendSuccessResponse } from '../../utils/response';

// @desc    Get dashboard overview statistics
// @route   GET /api/v1/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalLostItems = await LostItem.countDocuments();
    const totalFoundItems = await FoundItem.countDocuments();
    const activeLostItems = await LostItem.countDocuments({ status: 'LOST' });
    const activeFoundItems = await FoundItem.countDocuments({ status: 'FOUND' });

    sendSuccessResponse(res, {
      users: totalUsers,
      reports: {
        total: totalLostItems + totalFoundItems,
        lost: totalLostItems,
        found: totalFoundItems,
        activeLost: activeLostItems,
        activeFound: activeFoundItems
      }
    }, 'Stats retrieved successfully');
  } catch (error: any) {
    res.status(500);
    throw new Error('Failed to retrieve dashboard stats');
  }
};

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Private/Admin
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password_hash').sort({ createdAt: -1 });
    sendSuccessResponse(res, users, 'Users retrieved successfully');
  } catch (error: any) {
    res.status(500);
    throw new Error('Failed to retrieve users');
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Prevent admin from deleting themselves
    if (user.id === (req as any).user.id) {
      res.status(400);
      throw new Error('You cannot delete your own admin account');
    }

    // Delete user's associated items
    await LostItem.deleteMany({ user_id: user._id });
    await FoundItem.deleteMany({ user_id: user._id });
    
    await User.findByIdAndDelete(req.params.id);
    
    sendSuccessResponse(res, null, 'User and associated items deleted successfully');
  } catch (error: any) {
    if (res.statusCode === 200) res.status(500);
    throw error;
  }
};

// @desc    Get all reports (lost and found)
// @route   GET /api/v1/admin/reports
// @access  Private/Admin
export const getAllReports = async (req: Request, res: Response) => {
  try {
    const lostItems = await LostItem.find().populate('user_id', 'name email phone').lean();
    const foundItems = await FoundItem.find().populate('user_id', 'name email phone').lean();
    
    // Add a type identifier to each item
    const typedLost = lostItems.map(item => ({ ...item, reportType: 'LOST' }));
    const typedFound = foundItems.map(item => ({ ...item, reportType: 'FOUND' }));
    
    // Combine and sort by newest
    const allReports = [...typedLost, ...typedFound].sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    sendSuccessResponse(res, allReports, 'Reports retrieved successfully');
  } catch (error: any) {
    res.status(500);
    throw new Error('Failed to retrieve reports');
  }
};

// @desc    Delete a report (lost or found)
// @route   DELETE /api/v1/admin/reports/:type/:id
// @access  Private/Admin
export const deleteReport = async (req: Request, res: Response) => {
  try {
    const { type, id } = req.params;
    
    if (type === 'LOST') {
      const item = await LostItem.findByIdAndDelete(id);
      if (!item) {
        res.status(404);
        throw new Error('Lost item not found');
      }
    } else if (type === 'FOUND') {
      const item = await FoundItem.findByIdAndDelete(id);
      if (!item) {
        res.status(404);
        throw new Error('Found item not found');
      }
    } else {
      res.status(400);
      throw new Error('Invalid report type. Must be LOST or FOUND.');
    }

    sendSuccessResponse(res, null, 'Report deleted successfully');
  } catch (error: any) {
    if (res.statusCode === 200) res.status(500);
    throw error;
  }
};
