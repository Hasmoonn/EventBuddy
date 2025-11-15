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

