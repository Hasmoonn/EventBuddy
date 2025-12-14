import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { getNotificationSettings, updateNotificationSettings } from "../controllers/notificationController.js";


const profileRouter = express.Router();

profileRouter.get("/get-profile", userAuth, getProfile);
profileRouter.put("/update-profile", userAuth, updateProfile);
profileRouter.get("/get-notification-settings", userAuth, getNotificationSettings);
profileRouter.put("/update-notification-settings", userAuth, updateNotificationSettings);

export default profileRouter;