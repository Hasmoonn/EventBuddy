import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: String
}, { timestamps: true });

const reviewModel = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default reviewModel;
