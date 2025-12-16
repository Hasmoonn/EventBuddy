// services/chatbotService.js
const { openai, config } = require('../config/openai');
const { SYSTEM_PROMPT } = require('../prompts/systemPrompt');
const eventKnowledge = require('../data/eventKnowledge.json');

class ChatbotService {
  constructor() {
    this.conversationHistory = new Map();
  }

  async generateResponse(userMessage, sessionId = 'default', context = {}) {
    try {
      // 🔥 CHECK IF THIS IS AN AI ASSISTANT REQUEST
      const isAIAssistant = context?.page === 'ai-assistant' || 
                           userMessage.includes('MODE: AI_PLANNING_ASSISTANT');
      
      console.log('Is AI Assistant mode:', isAIAssistant);
      console.log('Message preview:', userMessage.substring(0, 200));

      let messages = [];
      
      if (isAIAssistant) {
        // ✅ For AI Assistant: Use formatted message directly, NO system prompt
        console.log('Using AI Assistant mode - bypassing system prompt');
        messages = [
          { role: 'user', content: userMessage }
        ];
      } else {
        // ✅ For regular chat: Use system prompt + history
        console.log('Using regular chat mode with history');
        if (!this.conversationHistory.has(sessionId)) {
          this.conversationHistory.set(sessionId, [
            { role: 'system', content: SYSTEM_PROMPT }
          ]);
        }

        const history = this.conversationHistory.get(sessionId);
        history.push({ role: 'user', content: userMessage });

        const recentHistory = history.slice(-11);
        messages = recentHistory;
      }

      const completion = await openai.chat.completions.create({
        model: config.model,
        messages: messages,
        temperature: config.temperature,
        max_tokens: config.maxTokens
      });

      const assistantMessage = completion.choices[0].message.content;

      // Only save to history for regular chat (not AI assistant one-offs)
      if (!isAIAssistant) {
        const history = this.conversationHistory.get(sessionId);
        history.push({ role: 'assistant', content: assistantMessage });
      }

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