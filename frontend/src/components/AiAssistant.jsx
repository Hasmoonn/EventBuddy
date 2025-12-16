import React, { useState } from 'react'
import {
  Bot,
  CheckCircle,
  Clock,
  DollarSign,
  Lightbulb,
  MapPin,
  Sparkles,
  Users
} from 'lucide-react'
import { getQuickSuggestions, sendChatMessage } from '../api/chat.api'

const EVENT_TYPES = [
  'Wedding',
  'Birthday Party',
  'Corporate Event',
  'Conference',
  'Workshop',
  'Baby Shower',
  'Anniversary',
  'Graduation',
  'Holiday Party',
  'Other'
]

const AiAssistant = ({ eventType }) => {
  // Editable event context
  const [budget, setBudget] = useState(10000)
  const [guestCount, setGuestCount] = useState(100)
  const [location, setLocation] = useState('')
  const [time, setTime] = useState('6-months')
  const [selectedEventType, setSelectedEventType] = useState(eventType || '')

  // Chat state
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const generateSuggestions = async () => {
    setIsLoading(true)

    try {
      let res
      const finalEventType = selectedEventType || eventType

      if (query.trim()) {
        res = await sendChatMessage(query.trim(), {
          page: 'ai-assistant',
          eventType: finalEventType,
          budget,
          guestCount,
          location,
          time
        })
      } else {
        res = await getQuickSuggestions(finalEventType || null)
      }

      if (res?.success && Array.isArray(res.suggestions)) {
        setSuggestions([
          {
            type: 'quick',
            title: 'Quick Suggestions',
            icon: Lightbulb,
            items: res.suggestions
          }
        ])
      } else if (res?.success && res.message) {
        setSuggestions([
          {
            type: 'response',
            title: 'AI Response',
            icon: Lightbulb,
            items: [res.message]
          }
        ])
      } else {
        setSuggestions([
          {
            type: 'none',
            title: 'No Suggestions',
            icon: Lightbulb,
            items: ['No suggestions available']
          }
        ])
      }
    } catch (error) {
      setSuggestions([
        {
          type: 'error',
          title: 'Error',
          icon: Lightbulb,
          items: ['Failed to fetch suggestions']
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const ecoFriendlyTips = [
    'Use digital invitations instead of paper',
    'Choose local, seasonal flowers',
    'Opt for venues with renewable energy',
    'Select vendors who practice sustainability',
    'Use biodegradable decorations',
    'Implement a zero-waste catering plan'
  ]

  return (
    <div className="space-y-6 mt-8 mb-6">
      {/* AI Chat Interface */}
      <div className="rounded-lg border bg-[rgb(var(--card))] shadow-sm border-[rgba(var(--primary),0.2)]">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 gradient-primary rounded-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Planning Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations for your{' '}
                {selectedEventType || eventType || 'event'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0 space-y-4">
          {/* Editable context inputs */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">

            {/* Event Type */}
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full rounded-md border px-2 py-1"
              >
                <option value="">Select Event</option>
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Guests */}
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary" />
              <input
                type="number"
                min="1"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full rounded-md border px-2 py-1"
                placeholder="Guests"
              />
            </div>

            {/* Budget */}
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full rounded-md border px-2 py-1"
                placeholder="Budget"
              />
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-md border px-2 py-1"
                placeholder="Location"
              />
            </div>

            {/* Time */}
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-md border px-2 py-1"
              >
                <option value="next-month">Next month</option>
                <option value="3-months">3 months</option>
                <option value="6-months">6 months</option>
                <option value="1-year">1 year</option>
              </select>
            </div>
          </div>

          {/* Message box */}
          <textarea
            placeholder="Ask me anything about planning your event..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border px-3 py-2 min-h-[80px]"
          />

          {/* Submit */}
          <button
            onClick={generateSuggestions}
            disabled={isLoading || !selectedEventType}
            className="w-full btn-hero flex items-center justify-center"
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

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {suggestions.map((s, i) => (
            <div key={i} className="rounded-lg border bg-card shadow-sm">
              <div className="p-6 pb-3 flex items-center space-x-2">
                <s.icon className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">{s.title}</h4>
              </div>
              <div className="p-6 pt-0">
                <ul className="space-y-2">
                  {s.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Eco Tips */}
      <div className="rounded-lg border bg-green-50 border-green-200 p-6">
        <h3 className="text-lg font-semibold text-green-800 flex items-center">
          <Lightbulb className="h-5 w-5 mr-2" />
          Eco-Friendly Planning Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-2 mt-4">
          {ecoFriendlyTips.map((tip, i) => (
            <span
              key={i}
              className="bg-green-200 text-green-800 rounded-full px-3 py-1 text-xs"
            >
              {tip}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AiAssistant
