import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { booking, eventsData } from '../assets/assets';
import {  Calendar, Clock, DollarSign, LogOut, MapPin, Plus, Settings, Sparkles, Star, Users } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [activeTab, setActiveTab] = useState("events");

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    setLoadingData(true)

    try {
      setEvents(eventsData || []);
      setBookings(booking || []);
    } catch (error) {
        toast.error(error.message)
    } finally {
      setLoadingData(false);
    }
  };

  const handleSignOut = async () => {
    try {
    } catch (error) {
      toast.error(error.message)
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const upcomingEvents = events.filter(event => new Date(event.event_date) > new Date());
  const totalBudget = events.reduce((sum, event) => sum + (event.budget || 0), 0);
  const totalGuests = events.reduce((sum, event) => sum + event.guest_count, 0);

  if (loading || loadingData) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--primary))] mx-auto"></div>
          <p className="text-[rgb(var(--muted-foreground))]">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[rgb(var(--background))] to-[rgba(var(--accent),0.5)]">
    </div>
  )
}

export default Dashboard
