// controllers/chatController.js
const chatbotService = require('../services/chatbotService');

class ChatController {
  async sendMessage(req, res) {
    try {
      const { message, sessionId } = req.body;

      if (!message || message.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Message is required'
        });
      }

      const response = await chatbotService.generateResponse(
        message,
        sessionId || `session-${Date.now()}`
      );

      res.json(response);
    } catch (error) {
      console.error('Chat Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Sorry, something went wrong. Please try again.'
      });
    }
  }

  getQuickSuggestions(req, res) {
    try {
      const { eventType } = req.query;
      const suggestions = chatbotService.getQuickSuggestions(eventType);
      
      res.json({
        success: true,
        suggestions
      });
    } catch (error) {
      console.error('Quick Suggestions Error:', error);
      res.status(500).json({
        success: false,
        error: 'Could not fetch suggestions'
      });
    }
  }

  getEventInfo(req, res) {
    try {
      const { eventType } = req.params;
      const eventInfo = chatbotService.getEventInfo(eventType);

      if (!eventInfo) {
        return res.status(404).json({
          success: false,
          error: 'Event type not found'
        });
      }

      res.json({
        success: true,
        data: eventInfo
      });
    } catch (error) {
      console.error('Event Info Error:', error);
      res.status(500).json({
        success: false,
        error: 'Could not fetch event information'
      });
    }
  }

  getFAQs(req, res) {
    try {
      const faqs = chatbotService.getFAQs();
      res.json({
        success: true,
        faqs
      });
    } catch (error) {
      console.error('FAQs Error:', error);
      res.status(500).json({
        success: false,
        error: 'Could not fetch FAQs'
      });
    }
  }

  clearHistory(req, res) {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({
          success: false,
          error: 'Session ID is required'
        });
      }

      const result = chatbotService.clearHistory(sessionId);
      res.json(result);
    } catch (error) {
      console.error('Clear History Error:', error);
      res.status(500).json({
        success: false,
        error: 'Could not clear history'
      });
    }
  }
}

module.exports = new ChatController();