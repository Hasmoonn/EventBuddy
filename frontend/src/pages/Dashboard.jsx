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

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[rgb(var(--background))] to-[rgba(var(--accent),0.5)]">
      {/* Header */}
      <header className="glass border-b shadow-sm fixed top-2 left-3 right-3 z-50">
        <div className="container-elegant py-3 px-4">
          <div className="flex items-center justify-between">
            <div onClick={() => {navigate('/'); scrollTo(0,0)}} className="flex items-center space-x-3 cursor-pointer">
              <div className="p-3 gradient-primary rounded-2xl animate-float">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-shimmer">
                  EventBuddy
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="inline-flex items-center border font-semibold transition-all text-xs px-2 py-1 rounded-full border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]">
                    Dashboard
                  </div>
                  <div className="status-dot status-confirmed"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-medium">Welcome back!</span>
                <span className="text-xs text-[rgb(var(--muted-foreground))] truncate max-w-32">
                  {user?.email}
                </span>
              </div>

              <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-4 interactive-element cursor-pointer" onClick={() => navigate('/settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>

              <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-4 interactive-element cursor-pointer" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 py-8 pt-28 grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card">Total Events: {events.length}</div>
        <div className="stat-card">Total Budget: {formatCurrency(totalBudget)}</div>
        <div className="stat-card">Total Guests: {totalGuests}</div>
        <div className="stat-card">Active Bookings: {bookings.length}</div>
      </div>
    </div>
  )
