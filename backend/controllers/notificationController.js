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

