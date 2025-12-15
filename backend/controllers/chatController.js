import { callChatbot } from "../services/chatbotProxy.service.js";
import axios from 'axios';

export const chatProxy = async (req, res) => {
  try {
    console.log('chatProxy request body:', JSON.stringify(req.body));
    const { message, page, history, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    // Chatbot controller expects { message, sessionId }
    const payload = {
      message,
      sessionId: sessionId || req.user?.id || `session-${Date.now()}`,
      // keep contextual info available for future improvements
      context: {
        role: req.user?.role,
        page,
        history
      }
    };

    const result = await callChatbot(payload);
    res.json(result);
  } catch (err) {
    console.error('Error in chatProxy:', err?.message || err, err?.stack || '');
    res.status(500).json({ error: 'Chatbot unavailable', details: err?.message });
  }
};

export const getSuggestions = async (req, res) => {
  try {
    const eventType = req.query.eventType || null;
    const chatbotBase = process.env.CHATBOT_BASE_URL || 'http://localhost:3001';
    const base = chatbotBase.replace(/\/$/, '');
    const url = `${base}/api/suggestions${eventType ? `?eventType=${encodeURIComponent(eventType)}` : ''}`;

    const response = await axios.get(url, { timeout: 8000 });
    return res.json(response.data);
  } catch (err) {
    console.error('Error fetching suggestions from chatbot:', err?.message || err);
    return res.status(502).json({ success: false, error: 'Chatbot suggestions unavailable' });
  }
};
