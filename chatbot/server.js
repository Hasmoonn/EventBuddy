// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatController = require('./controllers/chatController');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'EventBuddy AI Chatbot API',
    version: '1.0.0',
    endpoints: {
      chat: 'POST /api/chat',
      suggestions: 'GET /api/suggestions?eventType=wedding',
      eventInfo: 'GET /api/events/:eventType',
      faqs: 'GET /api/faqs',
      clearHistory: 'POST /api/clear-history'
    }
  });
});

app.post('/api/chat', chatController.sendMessage.bind(chatController));
app.get('/api/suggestions', chatController.getQuickSuggestions.bind(chatController));
app.get('/api/events/:eventType', chatController.getEventInfo.bind(chatController));
app.get('/api/faqs', chatController.getFAQs.bind(chatController));
app.post('/api/clear-history', chatController.clearHistory.bind(chatController));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🤖 EventBuddy Chatbot API running on port ${PORT}`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`🔍 API Docs: http://localhost:${PORT}`);
  console.log(`\n✅ Ready to receive requests!`);
});

module.exports = app;