import eventModel from '../models/eventModel.js';

export const createEvent = async (req, res) => {
    try {
        const userId = req.user.id;
        const eventData = { ...req.body, user_id: userId };

        const event = new eventModel(eventData);
        await event.save();

        res.json({ success: true, message: "Event created successfully", event });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create event", error: error.message });
    }
}

export const getUserEvents = async (req, res) => {
    try {
        const userId = req.user.id;
        const events = await eventModel.find({ user_id: userId }).sort({ event_date: 1 });

        if (!events || events.length === 0) {
            return res.json({ success: false, message: "No events found" });
        }
        res.json({ success: true, events });

    } catch (error) {
        res.json({ success: false, message: "Failed to retrieve events", error: error.message });
    }
}