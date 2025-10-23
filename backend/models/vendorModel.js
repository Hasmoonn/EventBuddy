import mongoose from "mongoose"

const vendorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  business_name: { type: String, required: true },
  category: { type: String, required: true, enum: ['decoration', 'catering', 'entertainment', 'photography', 'other'] },
  description: { type: String },
  location: { type: String },
  price_range_min: { type: Number },
  price_range_max: { type: Number },
  rating: { type: Number, default: 0 },
  total_reviews: { type: Number, default: 0 },
  image: { type: String },
  portfolio_images: [{ type: String }],
  verified: { type: Boolean, default: false },
  available: { type: Boolean, default: true },
  contact_email: { type: String },
  contact_phone: { type: String },
  services: [{ type: String }]
}, { timestamps: true });

const vendorModel = mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);

export default vendorModel;