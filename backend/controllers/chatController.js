import callChatbot from "../services/chatbotProxy.service.js";

export const chatProxy = async (req, res) => {
  try {
    console.log('chatProxy request body:', JSON.stringify(req.body));
    const {
      message,
      page,
      history,
      sessionId,
      eventType,
      budget,
      guestCount,
      location,
      time
    } = req.body;
    
    if (!message && page !== 'ai-assistant') {
      return res.status(400).json({ error: 'Message required' });
    }
    
    const finalSessionId = sessionId || req.user?.id || `session-${Date.now()}`;
    
    // 🔥 BUILD AI MESSAGE WITH CONTEXT
    let finalMessage = message;
    
    if (page === 'ai-assistant') {
      // ✅ Validate if we have meaningful data
      const hasValidData = eventType && 
                          budget && 
                          guestCount && 
                          location && 
                          time &&
                          location.length > 2 && 
                          location !== 'qwert'; // Example validation
      
      if (hasValidData) {
        // ✅ User provided complete, valid data
        finalMessage = `
You are an AI Event Planning Assistant. Provide personalized recommendations based on the following details:

📋 EVENT DETAILS:
- Event Type: ${eventType}
- Budget: $${budget}
- Guest Count: ${guestCount} people
- Location: ${location}
- Timeframe: ${time}

👤 USER REQUEST:
${message || 'Please provide comprehensive planning suggestions for this event.'}

📝 INSTRUCTIONS:
- Provide specific, actionable recommendations
- Suggest vendors, venues, and activities appropriate for the budget and location
- Include timeline suggestions
- Consider the guest count in your recommendations
- Be specific and practical
- Use clear formatting with sections

Provide your response now with detailed planning suggestions.
`;
      } else {
        // ❌ Missing or invalid data - AI should ask for it
        finalMessage = `
You are an AI Event Planning Assistant. 

The user wants to plan an event but some details are missing or unclear:
- Event Type: ${eventType || 'Not specified'}
- Budget: ${budget || 'Not specified'}
- Guest Count: ${guestCount || 'Not specified'}
- Location: ${location || 'Not specified'}
- Timeframe: ${time || 'Not specified'}

User's message: ${message || 'No additional message'}

Please politely ask the user to provide the missing information needed for personalized recommendations. Be specific about what you need.
`;
      }
    }
    
    const payload = {
      message: finalMessage,
      sessionId: finalSessionId,
      context: {
        role: req.user?.role,
        page,
        history
      }
    };
    
    console.log('AI payload message:\n', finalMessage);
    
    const result = await callChatbot(payload);
    res.json(result);
    
  } catch (err) {
    console.error('Error in chatProxy:', err?.message || err, err?.stack || '');
    res.status(500).json({
      error: 'Chatbot unavailable',
      details: err?.message
    });
  }
};