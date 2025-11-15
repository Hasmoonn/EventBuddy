import express from "express";
import { getUserAnalytics, getVendorAnalytics } from "../controllers/analyticsController.js";
import { userAuth } from "../middleware/userAuth.js";

const analyticsRouter = express.Router();

// Get user analytics
analyticsRouter.get("/user", userAuth, getUserAnalytics);

// Get vendor analytics (if user is a vendor)
analyticsRouter.get("/vendor", userAuth, getVendorAnalytics);

export default analyticsRouter;
