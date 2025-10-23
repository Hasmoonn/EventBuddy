import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  rsvp_status: { type: String, enum: ['confirmed', 'pending', 'declined'], default: 'pending' },
  plus_one: { type: Boolean, default: false },
  dietary_restrictions: { type: String },
});

const guestModel = mongoose.models.Guest || mongoose.model('Guest', guestSchema);

export default guestModel;