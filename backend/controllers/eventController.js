import eventModel from '../models/eventModel.js'

// create event controller
export const createEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventData = { ...req.body, user_id: userId };

    const event = new eventModel(eventData);
    await event.save();

    res.json({ success: true, message: "Event created successfully", event });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};