import notificationSettingModel from "../models/notificationSettingModel.js";
import notificationModel from "../models/notification.js";

export const getNotificationSettings = async (req, res) => {
  try {
    const userId = req.user.id; 

    let settings = await notificationSettingModel.findOne({ user_id: userId });

    if (!settings) {
      settings = new notificationSettingModel({ user_id: userId });
      await settings.save();
    }

    res.json({ success: true, settings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server error" });
  }
};

export const updateNotificationSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email_bookings, email_reminders, sms_notifications, marketing_emails } = req.body;

    const updatedSettings = await notificationSettingModel.findOneAndUpdate(
      { user_id: userId },
      { email_bookings, email_reminders, sms_notifications, marketing_emails },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({ success: true, message: "Notification settings updated successfully", settings: updatedSettings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createNotification = async ({ user_id, type, message }) => {
  try {
    const notification = new notificationModel({ user_id, type, message });
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Failed to create notification', error);
    throw error;
  }
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await notificationModel.find({ user_id: userId }).sort({ createdAt: -1 });
    res.json({ success: true, notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { notificationId } = req.body;

    if (!notificationId) return res.status(400).json({ success: false, message: 'notificationId is required' });

    const updated = await notificationModel.findOneAndUpdate(
      { _id: notificationId, user_id: userId },
      { read_status: true },
      { new: true }
    );

    if (!updated) return res.status(404).json({ success: false, message: 'Notification not found' });

    res.json({ success: true, notification: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

