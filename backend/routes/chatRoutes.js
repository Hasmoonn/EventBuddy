import express from 'express';
import { chatProxy, getSuggestions } from '../controllers/chatController.js';
import { userAuth } from '../middleware/userAuth.js';

const router = express.Router();

router.get('/suggestions', getSuggestions);
router.post('/', userAuth, chatProxy);

export default router;
