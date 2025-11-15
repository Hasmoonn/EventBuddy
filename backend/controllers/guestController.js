import guestModel from "../models/guestModel.js";
import eventModel from "../models/eventModel.js";

// Get all guests for an event
export const getEventGuests = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    // Verify the event belongs to the user
    const event = await eventModel.findOne({ _id: eventId, user_id: userId });
    if (!event) {
      return res.json({ success: false, message: "Event not found" });
    }

    const guests = await guestModel.find({ event_id: eventId }).sort({ createdAt: -1 });

    res.json({ success: true, guests });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Create a new guest
export const createGuest = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;
    const { name, email, phone, rsvp_status, plus_one, dietary_restrictions } = req.body;

    // Verify the event belongs to the user
    const event = await eventModel.findOne({ _id: eventId, user_id: userId });
    if (!event) {
      return res.json({ success: false, message: "Event not found" });
    }

    // Validate required fields
    if (!name) {
      return res.json({ success: false, message: "Guest name is required" });
    }

    const guestData = {
      event_id: eventId,
      name,
      email,
      phone,
      rsvp_status: rsvp_status || 'pending',
      plus_one: plus_one || false,
      dietary_restrictions
    };

    const guest = new guestModel(guestData);
    await guest.save();

    res.json({ success: true, message: "Guest added successfully", guest });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update a guest
export const updateGuest = async (req, res) => {
  try {
    const { eventId, guestId } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    // Verify the event belongs to the user
    const event = await eventModel.findOne({ _id: eventId, user_id: userId });
    if (!event) {
      return res.json({ success: false, message: "Event not found" });
    }

    const guest = await guestModel.findOneAndUpdate(
      { _id: guestId, event_id: eventId },
      updateData,
      { new: true }
    );

    if (!guest) {
      return res.json({ success: false, message: "Guest not found" });
    }

    res.json({ success: true, message: "Guest updated successfully", guest });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete a guest
export const deleteGuest = async (req, res) => {
  try {
    const { eventId, guestId } = req.params;
    const userId = req.user.id;

    // Verify the event belongs to the user
    const event = await eventModel.findOne({ _id: eventId, user_id: userId });
    if (!event) {
      return res.json({ success: false, message: "Event not found" });
    }

    const guest = await guestModel.findOneAndDelete({ _id: guestId, event_id: eventId });

    if (!guest) {
      return res.json({ success: false, message: "Guest not found" });
    }

    res.json({ success: true, message: "Guest removed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
