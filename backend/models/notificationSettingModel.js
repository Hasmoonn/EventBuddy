import mongoose from 'mongoose';

const notificationSettingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email_bookings: { type: Boolean, default: true },
  email_reminders: { type: Boolean, default: true },
  sms_notifications: { type: Boolean, default: false },
  marketing_emails: { type: Boolean, default: false },
});


const notificationSettingModel = mongoose.models.NotificationSetting || mongoose.model('NotificationSetting', notificationSettingSchema);

export default notificationSettingModel;
