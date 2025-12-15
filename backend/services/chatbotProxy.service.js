import axios from 'axios';

// Use CHATBOT_BASE_URL for consistency with other code; default to chatbot server root
const CHATBOT_BASE = process.env.CHATBOT_BASE_URL || 'http://localhost:3001';

const axiosInstance = axios.create({
	baseURL: CHATBOT_BASE,
	timeout: 10000,
});

export async function callChatbot(payload) {
	try {
		// Post to the chatbot's API route
		const response = await axiosInstance.post('/api/chat', payload);
		return response.data;
	} catch (err) {
		const message = err?.response?.data || err?.message || 'Chatbot request failed';
		const error = new Error(typeof message === 'string' ? message : JSON.stringify(message));
		error.status = err?.response?.status;
		throw error;
	}
}

export default callChatbot;

