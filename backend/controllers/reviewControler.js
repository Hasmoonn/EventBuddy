import reviewModel from "../models/reviewModel";
import vendorModel from "../models/vendorModel";
import bookingModel from "../models/bookingModel";
import mongoose from "mongoose";

// Get public reviews for a vendor
export const getVendorReviews = async (req, res) => {
    try {
        const { venderId } = req.params;
        // Vaklidate venderId format
        if (!mongoose.Types.ObjectId.isValid(venderId)) {
            return res.json({ success: false, massage: 'Inalid vendr ID' });
        }
        const vendor = await vendorModel.findById(venderId);
        if (!vendor) {
            return res.json({ success: false, massage: 'Vender not found' });
        }
        const reviews = await reviewModel.find({ vendor_id: venderId })
            .populate({
                path: 'user_id',
                select: 'name avatar_url_id',
                model: 'User'
            })
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            reviews: reviews || []
        });
    } catch (error) {
        console.error('Error fetching vendor reviews:', error);
        res.json({ success: false, massage: error.massage });
    }
};

// Submit a new review
export const submitReview = async (req, res) => {
    try {
        const { booking_id, rating, comment } = req.body;
        const user_id = req.body.user_id;

        //Verify booking exists and belongs to user
        const booking = await bookingModel.findOne({_id: booking_id, user_id: user_id});
        if(!booking){
            return res.json({success: false, massage:'Booking not found or does not belong to user'});
        }

    }catch(error){
        console.error('Error submitting review:', error);
        res.json({success: false, massage: error.massage});
    }
   
}
