import express from "express";
import { updateBookingStatus, getUserBookings, getVendorBookings, createBooking } from "../controllers/bookingController.js";
import {userAuth} from "../middleware/userAuth.js";

const bookingRouter = express.Router();

// Get bookings of logged-in user
bookingRouter.get("/user", userAuth, getUserBookings);

// GET /api/bookings/vendor
bookingRouter.get("/vendor", userAuth, getVendorBookings);

// Create a new booking
bookingRouter.post("/", userAuth, createBooking);

// PUT /api/bookings/:bookingId
bookingRouter.put("/:bookingId", userAuth, updateBookingStatus);

export default bookingRouter;
