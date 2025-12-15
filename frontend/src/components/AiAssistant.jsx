import React, { useState } from 'react'
import { Bot, CheckCircle, Clock, DollarSign, Lightbulb, MapPin, Sparkles, Users } from 'lucide-react'
import { getQuickSuggestions, sendChatMessage } from '../api/chat.api'

const AiAssistant = ({ eventType, budget,  guestCount, location }) => {

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateSuggestions = async () => {
    setIsLoading(true);

    try {
      let res;

      if (query && query.trim().length > 0) {
        // If user provided a query, send it to the chat endpoint and show the AI response
        res = await sendChatMessage(query.trim(), { page: 'ai-assistant', eventType, budget, guestCount, location });
      } else {
        // No query provided — return quick suggestions based on event type
        res = await getQuickSuggestions(eventType || null);
      }

      if (res && res.success && Array.isArray(res.suggestions)) {
        setSuggestions([
          {
            type: 'quick',
            title: 'Quick Suggestions',
            icon: Lightbulb,
            items: res.suggestions
          }
        ]);
      } else if (res && res.success && res.message) {
        setSuggestions([
          { type: 'response', title: 'AI Response', icon: Lightbulb, items: [res.message] }
        ]);
      } else {
        setSuggestions([{ type: 'none', title: 'No Suggestions', icon: Lightbulb, items: ['No suggestions available.'] }]);
      }
    } catch (error) {
      setSuggestions([{ type: 'error', title: 'Error', icon: Lightbulb, items: ['Failed to fetch suggestions.'] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const ecoFriendlyTips = [
    "Use digital invitations instead of paper",
    "Choose local, seasonal flowers",
    "Opt for venues with renewable energy",
    "Select vendors who practice sustainability",
    "Use biodegradable decorations",
    "Implement a zero-waste catering plan"
  ];

  return (
    <div className="space-y-6 mt-8 mb-6">
      {/* AI Chat Interface */}
      <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm border-[rgba(var(--primary),0.2)]">
        <div className='flex flex-col space-y-1.5 p-6'>
          <div className="flex items-center space-x-2">
            <div className="p-2 gradient-primary rounded-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-semibold leading-none tracking-tight text-lg">AI Planning Assistant</div>
              <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                Get personalized recommendations for your {eventType}
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-[rgb(var(--primary))]" />
              <span>{guestCount} guests</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-[rgb(var(--primary))]" />
              <span>${budget.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-[rgb(var(--primary))]" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-[rgb(var(--primary))]" />
              <span>6 months</span>
            </div>
          </div>
          
          <textarea
            placeholder="Ask me anything about planning your event..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[80px]"
          />
          
          <button 
            onClick={generateSuggestions}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 py-2 w-full btn-hero"
          >
            {isLoading ? (
              <>
                <Bot className="h-4 w-4 mr-2 animate-spin" />
                Generating suggestions...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Get AI Recommendations
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm h-fit">
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="flex items-center space-x-2">
                  <suggestion.icon className="h-5 w-5 text-[rgb(var(--primary))]" />
                  <div className="font-semibold leading-none tracking-tight text-base">{suggestion.title}</div>
                </div>
              </div>
              <div className='p-6 pt-0'>
                <ul className="space-y-2">
                  {suggestion.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Eco-Friendly Recommendations */}
      <div className="rounded-lg border text-[rgb(var(--card-foreground))] shadow-sm bg-green-50 border-green-200">
        <div className='flex flex-col space-y-1.5 p-6'>
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-green-600" />
            <div className="text-2xl font-semibold leading-none tracking-tight text-green-800">
              Eco-Friendly Planning Tips
            </div>
          </div>
        </div>
        <div className='p-6 pt-0'>
          <div className="grid md:grid-cols-2 gap-2">
            {ecoFriendlyTips.map((tip, index) => (
              <div key={index} className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors border-transparent hover:bg-green-300 justify-start p-2 bg-green-200 text-green-800">
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiAssistant