import express from 'express';
import { userAuth } from '../middleware/userAuth.js';
import { getVendorReviews, submitReview, getUserBookings, editReview, deleteReview } from '../controllers/reviewController.js';

const reviewRouter = express.Router();


export default reviewRouter;