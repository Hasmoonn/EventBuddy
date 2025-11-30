import React, { useState } from 'react'
import { ArrowLeft, Calendar, DollarSign, MapPin, Users } from 'lucide-react';
import toast from 'react-hot-toast'
import axios from 'axios'

const EventForm = ({ event, onSave, onCancel, backendUrl }) => {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: event.title || "",
    description: event.description || "",
    event_type: event.event_type || "",
    location: event.location || "",
    event_date: event.event_date ? new Date(event.event_date).toISOString().slice(0, 16) : "",
    guest_count: event.guest_count ? event.guest_count.toString() : "",
    budget: event.budget ? event.budget.toString() : "",
    status: event.status || "draft"
  });

  const eventTypes = [
    "Wedding",
    "Birthday Party",
    "Corporate Event",
    "Conference",
    "Workshop",
    "Baby Shower",
    "Anniversary",
    "Graduation",
    "Holiday Party",
    "Other"
  ];

  const eventStatuses = [
    { value: "draft", label: "Draft" },
    { value: "planning", label: "Planning" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dataToSend = {
        ...formData,
        guest_count: formData.guest_count ? parseInt(formData.guest_count) : undefined,
        budget: formData.budget ? parseFloat(formData.budget) : undefined
      };

      let response;
      if (event._id) {
        // Update existing event
        response = await axios.put(`${backendUrl}/api/events/${event._id}`, dataToSend);
      } else {
        // Create new event
        response = await axios.post(`${backendUrl}/api/events`, dataToSend);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        onSave(response.data.event);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--background))] to-[rgba(var(--accent),0.2)]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button onClick={onCancel} className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 mb-4 hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 cursor-pointer h-11 px-6" >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Cancel
          </button>

          <h1 className="text-4xl font-bold text-gradient mb-2">
            {event._id ? "Edit Event" : "Create Event"}
          </h1>

          <p className="text-[rgb(var(--muted-foreground))]">
            {event._id ? "Update your event details" : "Fill in your event details"}
          </p>
        </div>

        <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm max-w-2xl mx-auto hover:shadow-md">
          <div className='flex flex-col space-y-1.5 p-6'>
            <div className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[rgb(var(--primary))]" />
              Event Details
            </div>

            <div className='text-sm text-[rgb(var(--muted-foreground))]'>
              {event._id ? "Update the details for your event." : "Fill in the details for your new event."}
            </div>
          </div>

          <div className='p-6 pt-0'>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className='text-sm font-medium leading-none'>
                  Event Title *
                </label>

                <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' id="title" placeholder="Enter your event title" value={formData.title} onChange={(e) => handleInputChange("title", e.target.value)} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="event_type" className='text-sm font-medium leading-none'>
                    Event Type *
                  </label>

                  <select value={formData.event_type} onChange={(e) => handleInputChange("event_type", e.target.value)} placeholder="Select event type" className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' >
                    {eventTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className='text-sm font-medium leading-none' htmlFor="status">Status</label>
                  <select className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' value={formData.status} onChange={(e) => handleInputChange("status", e.target.value)} placeholder="Select status" >
                    {eventStatuses.map((status, index) => (
                      <option key={index} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className='text-sm font-medium leading-none' htmlFor="description">
                  Description
                </label>

                <textarea className='flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                  id="description"
                  placeholder="Describe your event..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="location" className='text-sm font-medium leading-none flex items-center gap-2' >
                    <MapPin className="h-4 w-4" />
                    Location *
                  </label>

                  <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' id="location" placeholder="Event location" value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} required
                  />
                </div>

                <div className="space-y-2">
                  <label className='text-sm font-medium leading-none' htmlFor="event_date">
                    Date & Time *
                  </label>

                  <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' id="event_date" type="datetime-local" value={formData.event_date} onChange={(e) => handleInputChange("event_date", e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className='text-sm font-medium leading-none flex items-center gap-2' htmlFor="guest_count" >
                    <Users className="h-4 w-4" />
                    Expected Guests
                  </label>

                  <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' id="guest_count" type="number" placeholder="Number of guests" value={formData.guest_count} onChange={(e) => handleInputChange("guest_count", e.target.value)} min="1"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium leading-none flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Budget
                  </label>

                  <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' id="budget" type="number" placeholder="Event budget" value={formData.budget} onChange={(e) => handleInputChange("budget", e.target.value)} min="0" step="0.01" />
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-[rgb(var(--background))] transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 flex-1 cursor-pointer h-9 px-6">
                  {loading ? "Saving..." : (event._id ? "Save Changes" : "Create Event")}
                </button>

                <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 cursor-pointer h-9 px-6' type="button" onClick={onCancel} >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventForm