import express from 'express';
import { getAdminStats, getUsers, getVendors, toggleUserStatus, toggleVendorVerification, getAdminAnalytics } from '../controllers/adminController.js';
import adminAuth from '../middleware/adminAuth.js';

const adminRouter = express.Router();

// All admin routes require admin authentication
adminRouter.get('/stats', adminAuth, getAdminStats);
adminRouter.get('/users', adminAuth, getUsers);
adminRouter.get('/vendors', adminAuth, getVendors);
adminRouter.post('/toggle-user-status', adminAuth, toggleUserStatus);
adminRouter.post('/toggle-vendor-verification', adminAuth, toggleVendorVerification);
adminRouter.get('/analytics', adminAuth, getAdminAnalytics);

export default adminRouter;
