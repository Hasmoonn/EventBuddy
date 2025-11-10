import express from "express"
import { createVendor, getAllVendors, getVendorById, getVendorDashboard, removePortfolioImage, updateVendorProfile, uploadPortfolioImages, uploadVendorImage } from "../controllers/vendorController.js";
import { userAuth } from "../middleware/userAuth.js";
import { getVendorBookings, updateBookingStatus } from "../controllers/bookingController.js";
import { getVendorReviews } from "../controllers/reviewController.js";
import upload from "../middleware/multer.js";

const vendorRouter = express.Router();

vendorRouter.get("/", getAllVendors); 
vendorRouter.post("/create", userAuth, createVendor);

vendorRouter.post("/upload-image", userAuth, upload.single('image'), uploadVendorImage);
vendorRouter.post("/upload-portfolio", userAuth, upload.array('portfolio', 10), uploadPortfolioImages);
vendorRouter.delete("/remove-portfolio-image", userAuth, removePortfolioImage);

vendorRouter.get("/dashboard", userAuth, getVendorDashboard)
vendorRouter.put("/update", userAuth, updateVendorProfile);
vendorRouter.get('/bookings', userAuth, getVendorBookings);
vendorRouter.put('/bookings/:bookingId/status', userAuth, updateBookingStatus);
vendorRouter.get("/reviews", userAuth, getVendorReviews);

vendorRouter.get("/:id", getVendorById);


export default vendorRouter;