import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  read_status: { type: Boolean, default: false }
}, { timestamps: true });

const notificationModel = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

export default notificationModel;
