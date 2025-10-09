import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { eventsData } from '../assets/assets';
import toast from 'react-hot-toast';
import EventForm from '../components/EventForm';
import { ArrowLeft, Calendar, Edit, MapPin, Trash2, Users } from 'lucide-react';
import GuestManagement from '../components/GuestManagement';
import BookingsList from '../components/BookingsList';

const EventDetails = () => {

  const { id } = useParams();
  const [user, setUser] = useState({ id: "U001"});
  const navigate = useNavigate();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
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

      // const { data, error } = await supabase
      //   .from("events")
      //   .select("*")
      //   .eq("id", id)
      //   .eq("user_id", user.id)
      //   .single();

      // if (error) throw error;
      const foundEvent = eventsData.find((ev) => ev.id === id && ev.user_id === user.id);

      if (!foundEvent) {
        toast.error("Event not found")
      }

      setEvent(foundEvent);
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
    
    const confirmed = window.confirm("Are you sure you want to delete this event? This action cannot be undone.");
    if (!confirmed) 
      return;

    try {
      // const { error } = await supabase
      //   .from("events")
      //   .delete()
      //   .eq("id", event.id)
      //   .eq("user_id", user.id);

      // if (error) throw error;

      // toast({
      //   title: "Event deleted",
      //   description: "Your event has been successfully deleted.",
      // });
      // navigate("/dashboard");
    } catch (error) {
      toast.error(error.message)
    }
  };

  // Minimal return for Step 1 to avoid syntax error
  return <div>EventDetails Component Initialized</div>
}

export default EventDetails
