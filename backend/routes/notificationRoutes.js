import express from 'express';
import { getNotifications, markAsRead, markAllAsRead } from '../controllers/notificationController.js';
import {userAuth} from '../middleware/userAuth.js';

const router = express.Router();

router.get('/', userAuth, getNotifications);
router.put('/mark-read', userAuth, markAsRead);
router.put('/mark-all-read', userAuth, markAllAsRead);

export default router;

