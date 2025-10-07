import { Calendar, DollarSign, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { eventsData } from '../assets/assets';

const BookingDialog = ({ vendor, open, onClose }) => {

  const [user, setUser] = useState(true)
   const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [bookingForm, setBookingForm] = useState({
    event_id: "",
    booking_date: "",
    service_description: "",
    notes: "",
    total_amount: ""
  });

  const fetchUserEvents = async () => {
    if (!user) 
      return;
    
    setLoading(true);

    try {
      setEvents(eventsData)
    } catch (error) {
        toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) 
      return;
    
    setSubmitting(true);

    try {

      // Reset form and close dialog
      setBookingForm({
        event_id: "",
        booking_date: "",
        service_description: "",
        notes: "",
        total_amount: ""
      });

      onClose()
    } catch (error) {
      
    } finally {
      setSubmitting(false);
    }
  };


  const updateForm = (name, value) => {
    setBookingForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (open && user) {
      fetchUserEvents();
    }
  }, [open, user]);



  // don’t render if closed
  if (!open) 
    return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"  >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-4">
          <h2 className="text-lg font-semibold leading-none tracking-tight">Request Booking</h2>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">
            Send a booking request to {vendor.business_name}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className='text-sm font-medium leading-none' htmlFor="event_id" >Select Event *</label>
            {loading ? (
              <div className="h-10 bg-[rgb(var(--muted))] rounded-md animate-pulse" />
            ) : (
              <select className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' placeholder="Choose an event" 
                value={bookingForm.event_id}
                onChange={(value) => updateForm("event_id", value)}
                required
              >                                 
                {
                  events.map((event, index) => (
                    <option key={index} value={event.id}>
                      {event.title} - {new Date(event.event_date).toLocaleDateString()}
                    </option>
                  ))
                }
              </select>
            )}
            {events.length === 0 && !loading && (
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                No active events found. Please create an event first.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className='text-sm font-medium leading-none flex items-center gap-2' htmlFor="booking_date" >
              <Calendar className="h-4 w-4" />
              Service Date *
            </label>
            <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              id="booking_date"
              type="datetime-local"
              value={bookingForm.booking_date}
              onChange={(e) => updateForm("booking_date", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className='text-sm font-medium leading-none' htmlFor="service_description">Service Description</label>
            <textarea className='flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              id="service_description"
              value={bookingForm.service_description}
              onChange={(e) => updateForm("service_description", e.target.value)}
              placeholder="Describe the services you need..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className='text-sm font-medium leading-none flex items-center gap-2' htmlFor="total_amount" >
              <DollarSign className="h-4 w-4" />
              Budget
            </label>
            <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              id="total_amount"
              type="number"
              value={bookingForm.total_amount}
              onChange={(e) => updateForm("total_amount", e.target.value)}
              placeholder={`Budget range: $${vendor.price_range_min?.toLocaleString()} - $${vendor.price_range_max?.toLocaleString()}`}
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <label className='text-sm font-medium leading-none' htmlFor="notes">Additional Notes</label>

            <textarea className='flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              id="notes"
              value={bookingForm.notes}
              onChange={(e) => updateForm("notes", e.target.value)}
              placeholder="Any special requirements or questions..."
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 h-9 flex-1 cursor-pointer bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))]'
              type="submit" 
              disabled={submitting || events.length === 0}
            >
              {submitting ? "Sending..." : "Send Request"}
            </button>

            <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] cursor-pointer h-9 px-6' type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingDialog