import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

/**
 * Send a chat message to the backend chatbot endpoint.
 * @param {string} message
 * @param {object} options - optional payload (e.g., sessionId)
 * @returns {Promise<object>} response data from backend
 */
export async function sendChatMessage(message, options = {}) {
  const payload = { message, ...options };

  const res = await axios.post(`${backendUrl}/api/chat`, payload, {
    withCredentials: true,
  });

  return res.data;
}

/**
 * Get quick suggestions from the chatbot service.
 * @param {string|null} eventType
 * @returns {Promise<object>} { success, suggestions }
 */
export async function getQuickSuggestions(eventType = null) {
  const url = `${backendUrl}/api/chat/suggestions${eventType ? `?eventType=${encodeURIComponent(eventType)}` : ''}`;
  const res = await axios.get(url, { withCredentials: true });
  return res.data;
}
