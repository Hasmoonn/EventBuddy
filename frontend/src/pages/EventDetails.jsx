import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import EventForm from '../components/EventForm';
import { ArrowLeft, Calendar, Edit, MapPin, Trash2, Users } from 'lucide-react';
import GuestManagement from '../components/GuestManagement';
import BookingsList from '../components/BookingsList';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { HashLoader } from 'react-spinners';


const EventDetails = () => {

  const { id } = useParams();
  const {backendUrl, user, navigate, loading, setLoading} = useContext(AuthContext);
  
  const [event, setEvent] = useState(null);
  const [editing, setEditing] = useState(false);

  const [activeTab, setActiveTab] = useState("guests");

  useEffect(() => {
    if (id && user) {
      fetchEvent();
    }
  }, [id, user]);

  const fetchEvent = async () => {
    if (!id || !user) 
      return;
    
    try {
      setLoading(true);

      const { data } = await axios.get(`${backendUrl}/api/events/${id}`);

      if (data.success) {
        setEvent(data.event);
      } else {
        toast.error(data.message || "Failed to load event");
        navigate("/dashboard");
        return;
      }
    } catch (error) {
        toast.error(error.message)
        navigate("/dashboard");
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!event || !user) 
      return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone."
    );

    if (!confirmed) 
      return;

    try {
      setLoading(true);
      const { data } = await axios.delete(`${backendUrl}/api/events/${event._id}`);

      if (data.success) {
        toast.success(data.message);
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Failed to delete event");
      }
    } catch (error) {
      toast.error(error.message || "Error deleting event");
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <HashLoader color='#D8B4FE' />
      </div> 
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--background))] to-[rgba(var(--accent),0.2)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Event not found</h2>
          <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 h-11 px-6 py-3 cursor-pointer border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95" onClick={() => navigate("/dashboard")}>
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <EventForm event={event} onSave={(updatedEvent) => {
        setEvent(updatedEvent);
        setEditing(false);
      }}

      onCancel={() => setEditing(false)} backendUrl={backendUrl} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--background))] to-[rgb(var(--accent),0.2)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 hover:bg-[rgb(var(--accent))] hover:text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 h-11 cursor-pointer px-6 mb-4" onClick={() => navigate("/dashboard")} >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">{event.title}</h1>
              <div className="flex items-center gap-4 text-[rgb(var(--muted-foreground))] mb-4">
                <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all ${event.status === 'draft' ? 'border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]' : event.status === 'planning' ? 'border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]' : event.status === 'confirmed' ? 'border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]' : event.status === 'completed' ? 'border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]' : event.status === 'cancelled' ? 'border-transparent bg-[rgb(var(--destructive))] text-[rgb(var(--destructive-foreground))] hover:bg-[rgba(var(--destructive),0.8)]' : 'border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'}`} >
                  {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
                </div>

                <span className="text-sm">
                  Created At {new Date(event.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 px-6 py-3 cursor-pointer' onClick={() => setEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </button>

              <button className='inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 text-[rgb(var(--destructive-foreground))] bg-[rgb(var(--destructive))] hover:bg-[rgba(var(--destructive),0.9)] hover:scale-105 active:scale-95 h-11 px-6 py-3 cursor-pointer' onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-5 w-5 text-[rgb(var(--primary))]" />
                <span className="font-medium">Date & Time</span>
              </div>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                {event?.event_date ? new Date(event.event_date).toLocaleString() : "Not specified"}
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-[rgb(var(--primary))]" />
                <span className="font-medium">Location</span>
              </div>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">{event.location}</p>
            </div>
          </div>

          <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-[rgb(var(--primary))]" />
                <span className="font-medium">Expected Guests</span>
              </div>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                {event.guest_count || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {event.description && (
          <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant mb-8">
            <div className='flex flex-col space-y-1.5 p-6'>
              <div className='text-2xl font-semibold leading-none tracking-tight'>Description</div>
            </div>
            <div className='p-6 pt-0'>
              <p className="text-[rgb(var(--muted-foreground))]">{event.description}</p>
            </div>
          </div>
        )}

        <div className='space-y-6'>
          <div className="grid w-full grid-cols-2 bg-[rgb(var(--muted))] p-1 gap-2 rounded-md text-[rgb(var(--muted-foreground))]">
            <button onClick={() => setActiveTab("guests")} className={`px-3 py-2 text-sm font-medium rounded-sm transition-all cursor-pointer ${activeTab === "guests" ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm" : "text-[rgb(var(--muted-foreground))]"}`} >
              Guest Management
            </button>

            <button onClick={() => setActiveTab("bookings")} className={`px-3 py-2 text-sm font-medium rounded-sm transition-all cursor-pointer ${activeTab === "bookings" ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm" : "text-[rgb(var(--muted-foreground))]"}`}
            >
              Vendor Bookings
            </button>
          </div>

          {
            activeTab === "guests" && 
            <GuestManagement eventId={event._id} />
          }

          {
            activeTab === "bookings" && 
            <BookingsList eventId={event._id} />
          }
        </div>
      </div>
    </div>
  )
}

export default EventDetails