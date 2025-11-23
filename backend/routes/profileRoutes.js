import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { getNotificationSettings, updateNotificationSettings } from "../controllers/notificationController.js";


const profileRouter = express.Router();

router.get("/get-profile", userAuth, getProfile);
router.put("/update-profile", userAuth, updateProfile);
router.get("/get-notification-settings", userAuth, getNotificationSettings);
router.put("/update-notification-settings", userAuth, updateNotificationSettings);

export default profileRouter;