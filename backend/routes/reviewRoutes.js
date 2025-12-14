import express from 'express';
import { userAuth } from '../middleware/userAuth.js';
import { getVendorReviews, submitReview, getUserBookings, editReview, deleteReview } from '../controllers/reviewControler.js';

const reviewRouter = express.Router();

reviewRouter.get("/vendor/:vendorId", getVendorReviews);

reviewRouter.post("/submit", userAuth, submitReview);
reviewRouter.get("/user-bookings", userAuth, getUserBookings);
reviewRouter.put("/:reviewId", userAuth, editReview);
reviewRouter.delete("/:reviewId", userAuth, deleteReview);

export default reviewRouter;