// controllers/bookingController.js
import mongoose from "mongoose";
import bookingModel from "../models/bookingModel.js";
import vendorModel from "../models/vendorModel.js";


export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId } = req.query;

    let query = { user_id: userId };
    if (eventId && mongoose.Types.ObjectId.isValid(eventId)) {
      query.event_id = new mongoose.Types.ObjectId(eventId);
    } else if (eventId) {
      return res.json({ success: false, message: "Invalid event ID" });
    }

    const bookings = await bookingModel
      .find(query)
      .populate("vendor_id", "business_name category location contact_email contact_phone")
      .sort({ booking_date: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.json({ success: false, message: 'Invalid status' });
    }

    const booking = await bookingModel.findByIdAndUpdate(bookingId, { status },{ new: true }).populate('user_id', 'name email').populate('event_id', 'title');

    if (!booking) {
      return res.json({ success: false, message: 'Booking not found' });
    }

    res.json({ success: true, message: `Booking ${status.toLowerCase()} successfully`, booking });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const userId = req.user.id;
    const { vendor_id, event_id, booking_date, total_amount, service_description, notes } = req.body;

    // Validate required fields
    if (!vendor_id || !event_id || !booking_date) {
      return res.json({ success: false, message: 'Vendor, event, and booking date are required' });
    }

    // Check if vendor exists
    const vendor = await vendorModel.findById(vendor_id);
    if (!vendor) {
      return res.json({ success: false, message: 'Vendor not found' });
    }

    // Create booking
    const bookingData = {
      user_id: userId,
      vendor_id,
      event_id,
      booking_date: new Date(booking_date),
      total_amount: total_amount ? parseFloat(total_amount) : undefined,
      service_description,
      notes,
      status: 'Pending'
    };

    const booking = new bookingModel(bookingData);
    await booking.save();

    res.json({ success: true, message: 'Booking request sent successfully', booking });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get vendor bookings
export const getVendorBookings = async (req, res) => {
  try {
    const vendorId = req.user.id;

    const vendor = await vendorModel.findOne({ user_id: vendorId });

    if (!vendor) {
      return res.json({ success: false, message: 'Vendor not found' });
    }

    const bookings = await bookingModel.find({ vendor_id: vendor._id }).populate('user_id', 'name email').sort({ createdAt: -1 });

    res.json({success: true, bookings});
  } catch (error) {
    res.json({success: false, message: error.message });
  }
};
