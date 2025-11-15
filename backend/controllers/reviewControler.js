import reviewModel from "../models/reviewModel.js";
import vendorModel from "../models/vendorModel.js";
import bookingModel from "../models/bookingModel.js";
import mongoose from "mongoose";

export const getVendorReviews = async (req, res) => {
  try {
    const { vendorId } = req.params;

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
