import reviewModel from "../models/reviewModel.js";
import vendorModel from "../models/vendorModel.js";
import bookingModel from "../models/bookingModel.js";
import mongoose from "mongoose";

// Get public reviews for a vendor
export const getVendorReviews = async (req, res) => {
  try {
    const { vendorId } = req.params;

    // Validate vendorId format
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.json({ success: false, message: 'Invalid vendor ID' });
    }

    const vendor = await vendorModel.findById(vendorId);
    if (!vendor) {
      return res.json({ success: false, message: 'Vendor not found' });
    }

    const reviews = await reviewModel.find({ vendor_id: vendorId })
      .populate({
        path: 'user_id',
        select: 'name avatar_url _id',
        model: 'User'
      })
      .sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      reviews: reviews || [] 
    });
  } catch (error) {
    console.error('Error fetching vendor reviews:', error);
    res.json({ success: false, message: error.message });
  }
};

export const submitReview = async (req, res) => {
    try {
        const { booking_id, rating, comment } = req.body;
        const userId = req.body.userId;

        const booking = await bookingModel.findOne({ _id: booking_id, user_id: userId });
        if (!booking) {
            return res.json({ success: false, message: 'Booking not found or does not belong to user' });
        }


        const existingReview = await reviewModel.findOne({ user_id: userId, booking_id: booking_id });
        if (existingReview) {
            return res.json({ success: false, message: 'Review already exists for this booking' });
        }

        const review = new reviewModel({
            user_id: userId,
            vendor_id: booking.vendor_id,
            booking_id: booking_id,
            rating: rating,
            comment: comment
        });

        await review.save();

        res.json({ success: true, message: 'Review submitted successfully' });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.json({ success: false, message: error.message });
    }
};


export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        const bookings = await bookingModel.find({ user_id: userId })
            .populate('vendor_id', 'business_name')
            .populate('event_id', 'title')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            bookings: bookings || []
        });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.json({ success: false, message: error.message });
    }
};

export const editReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.body.userId;

        const review = await reviewModel.findOne({ _id: reviewId, user_id: userId });
        if (!review) {
            return res.json({ success: false, message: 'Review not found or does not belong to user' });
        }


        review.rating = rating;
        review.comment = comment;
        await review.save();

        res.json({ success: true, message: 'Review updated successfully' });
    } catch (error) {
        console.error('Error editing review:', error);
        res.json({ success: false, message: error.message });
    }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.body.userId;

    
    const review = await reviewModel.findOne({ _id: reviewId, user_id: userId });
    if (!review) {
      return res.json({ success: false, message: 'Review not found or does not belong to user' });
    }

   
    await reviewModel.findByIdAndDelete(reviewId);

    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.json({ success: false, message: error.message });
  }
};