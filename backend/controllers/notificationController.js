import notificationSettingModel from "../models/notificationSettingModel.js";
import notificationModel from "../models/notification.js";

export const getNotificationSettings = async (req, res) => {
  try {
    const userId = req.user.id; // from middleware

    let settings = await notificationSettingModel.findOne({ user_id: userId });

    if (!settings) {
      // Create default settings if none exist
      settings = new notificationSettingModel({ user_id: userId });
      await settings.save();
    }

    res.json({ success: true, settings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server error" });
  }
};
