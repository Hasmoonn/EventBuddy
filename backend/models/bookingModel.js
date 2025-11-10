import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  booking_date: { type: Date, required: true },
  total_amount: { type: Number },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
  service_description: { type: String },
  notes: { type: String }
}, { timestamps: true });


const bookingModel = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default bookingModel;