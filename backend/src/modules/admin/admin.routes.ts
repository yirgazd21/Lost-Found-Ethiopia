import express from 'express';
import { getDashboardStats, getAllUsers, deleteUser, getAllReports, deleteReport } from './admin.controller';
import { protect, authorize } from '../../middleware/auth';
import { UserRole } from '../../models/user.model';

const router = express.Router();

// All routes here require authentication and ADMIN role
router.use(protect);
router.use(authorize(UserRole.ADMIN));

router.get('/stats', getDashboardStats);

router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .delete(deleteUser);

router.route('/reports')
  .get(getAllReports);

router.route('/reports/:type/:id')
  .delete(deleteReport);

export default router;
