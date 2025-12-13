// services/chatbotService.js
const { openai, config } = require('../config/openai');
const { SYSTEM_PROMPT } = require('../prompts/systemPrompt');
const eventKnowledge = require('../data/eventKnowledge.json');

class ChatbotService {
  constructor() {
    this.conversationHistory = new Map();
  }

  async generateResponse(userMessage, sessionId = 'default') {
    try {
      if (!this.conversationHistory.has(sessionId)) {
        this.conversationHistory.set(sessionId, [
          { role: 'system', content: SYSTEM_PROMPT }
        ]);
      }

      const history = this.conversationHistory.get(sessionId);
      history.push({ role: 'user', content: userMessage });

      const recentHistory = history.slice(-11);

      const completion = await openai.chat.completions.create({
        model: config.model,
        messages: recentHistory,
        temperature: config.temperature,
        max_tokens: config.maxTokens
      });

      const assistantMessage = completion.choices[0].message.content;
      history.push({ role: 'assistant', content: assistantMessage });

      return {
        success: true,
        message: assistantMessage,
        sessionId: sessionId
      };

    } catch (error) {
      console.error('Chatbot Service Error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Sorry, I encountered an error. Please try again.'
      };
    }
  }

  getQuickSuggestions(eventType = null) {
    const suggestions = {
      general: [
        "How do I plan a wedding?",
        "Show me budget-friendly vendors",
        "What's included in your platform?",
        "How does booking work?"
      ],
      wedding: [
        "Create a wedding checklist",
        "Recommend wedding venues",
        "What's a typical wedding budget?",
        "How early should I book vendors?"
      ],
      birthday: [
        "Plan a birthday party",
        "Kids party ideas",
        "Birthday venue recommendations",
        "Party entertainment options"
      ],
      corporate: [
        "Plan a corporate event",
        "Conference venue requirements",
        "Team building event ideas",
        "Corporate event budget planning"
      ]
    };

    return eventType ? suggestions[eventType] : suggestions.general;
  }

  getEventInfo(eventType) {
    return eventKnowledge.eventTypes[eventType] || null;
  }

  clearHistory(sessionId) {
    this.conversationHistory.delete(sessionId);
    return { success: true, message: 'Conversation history cleared' };
  }

  getFAQs() {
    return eventKnowledge.faqs;
  }
}

module.exports = new ChatbotService();