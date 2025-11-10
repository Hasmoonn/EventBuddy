import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  event_type: { type: String, required: true },
  location: { type: String },
  event_date: { type: Date, required: true },
  guest_count: { type: Number },
  budget: { type: Number },
  status: { type: String, enum: ['draft', 'planning', 'confirmed', 'completed', 'cancelled'], default: 'draft' },
}, { timestamps: true });


const eventModel = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default eventModel;
