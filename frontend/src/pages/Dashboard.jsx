import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import {  Calendar, Clock, DollarSign, LogOut, MapPin, Plus, Settings, Sparkles, Star, Users } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';
import { HashLoader } from 'react-spinners';
import axios from 'axios';

const Dashboard = () => {
  const {backendUrl, user, setUser, setIsAuthenticated, navigate, loading, setLoading} = useContext(AuthContext)

  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [activeTab, setActiveTab] = useState("events");

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchUserEvents(), fetchUserBookings()]);
    };

    if (!loading && !user) {
      navigate('/auth');
    } else if(user) {
      loadData();
    }
  }, [user]);


  // Fetch user events
  const fetchUserEvents  = async () => {
    setLoading(true)

    try {
      const { data } = await axios.get(`${backendUrl}/api/events/user`);
      if (data.success) {
        setEvents(data.events);
      } else {
        toast.error(data.message || "Failed to load events");
      }
    } catch (error) {
      toast.error(error.message || "Error loading events");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user bookings
  const fetchUserBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/bookings/user`);
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message || "Failed to load bookings");
      }
    } catch (error) {
      toast.error("Error loading bookings");
    }
  };


  const handleSignOut = async () => {
    setLoading(true)

    try {
      const {data} = await axios.post(backendUrl + "/api/auth/logout")

      if (data.success) {
        toast.success(data.message)
        setUser(null)
        setIsAuthenticated(false)
        navigate('/auth')
      } else {
        return toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error.message);
      toast.error(data.message)
    } finally{
      setLoading(false)
    }   
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
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

  
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <HashLoader color='#D8B4FE' />
      </div> 
    );
  }


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

      <div className="max-w-7xl mx-auto px-4 py-8 pt-28">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-stats animate-fade-in">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="leading-none tracking-tight text-sm font-medium text-[rgb(var(--muted-foreground))]">
                Total Events
              </div>
              <div className="p-2 gradient-primary rounded-lg animate-float">
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </div>

            <div className='p-6 pt-0'>
              <div className="text-3xl font-bold text-gradient mb-1">
                {events.length}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`status-dot ${upcomingEvents?.length > 0 ? 'status-confirmed' : 'status-pending'}`}></span>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">
                  {upcomingEvents?.length} upcoming
                </p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-stats animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="leading-none tracking-tight text-sm font-medium text-[rgb(var(--muted-foreground))]">Total Budget</div>
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg animate-float">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className='p-6 pt-0'>
              <div className="text-3xl font-bold text-gradient mb-1">{formatCurrency(totalBudget)}</div>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                Across all events
              </p>
            </div>
          </div>
          
          <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-stats animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="leading-none tracking-tight text-sm font-medium text-[rgb(var(--muted-foreground))]">Total Guests</div>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg animate-float">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className='p-6 pt-0'>
              <div className="text-3xl font-bold text-gradient mb-1">{totalGuests}</div>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                Expected attendees
              </p>
            </div>
          </div>
          
          <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-stats animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="leading-none tracking-tight text-sm font-medium text-[rgb(var(--muted-foreground))]">Active Bookings</div>
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg animate-float">
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className='p-6 pt-0'>
              <div className="text-3xl font-bold text-gradient mb-1">{bookings.length}</div>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                Vendor services
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Events Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className='mt-6'>
              <div className="inline-flex border items-center justify-center rounded-md bg-[rgba(var(--accent-foreground),0.2)] p-1 text-[rgb(var(--muted-foreground))]">
                {/* Tab Triggers */}
                <button onClick={() => setActiveTab("events")} className={`inline-flex items-center justify-center rounded-sm px-6 py-2 text-sm font-medium transition-all ${activeTab === "events" ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-md" : "text-[rgb(var(--muted-foreground))]"} cursor-pointer`} >
                  My Events
                </button>

                <button onClick={() => setActiveTab("bookings")} className={`inline-flex items-center justify-center rounded-sm px-6 py-2 text-sm font-medium transition-all ${activeTab === "bookings" ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-md" : "text-[rgb(var(--muted-foreground))]"} cursor-pointer`} >
                  Bookings
                </button>
              </div>

              <div className='mt-4'>
                {activeTab === "events" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Your Events</h3>

                      <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-9 px-4 btn-hero cursor-pointer" onClick={() => navigate('/create-event')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Event
                      </button>
                    </div>
                    
                    {events.length === 0 ? (
                      <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
                        <div className="text-center p-6 py-16">
                          <div className="animate-bounce-in">
                            <div className="p-4 gradient-primary rounded-full w-20 h-20 mx-auto mb-6 animate-float">
                              <Calendar className="h-12 w-12 text-white" />
                            </div>

                            <h4 className="text-xl font-semibold mb-3 text-gradient">No events yet</h4>
                            <p className="text-[rgb(var(--muted-foreground))] mb-6 max-w-md mx-auto">
                              Create your first event to get started with planning amazing experiences.
                            </p>

                            <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-9 px-4 btn-hero interactive-element cursor-pointer" onClick={() => navigate('/create-event')}>
                              <Plus className="h-4 w-4 mr-2" />
                              Create Your First Event
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {events.map((event, index) => (
                          <div key={index} className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="flex flex-col space-y-1.5 p-6 pb-3">
                              <div className="flex items-center justify-between">
                                <div className="leading-none tracking-tight text-lg font-semibold text-gradient">
                                  {event.title}
                                </div>

                                <div className="flex items-center space-x-2">
                                  <span className={`status-dot ${event.status.toLowerCase() === 'confirmed' ? 'status-confirmed' : event.status.toLowerCase() === 'pending' ? 'status-pending' : 'status-cancelled'}`}></span>

                                  <div className={`inline-flex items-center border font-semibold transition-all text-xs px-2 py-1 rounded-full ${event.status.toLowerCase() === 'confirmed' ? 'border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]' : 'border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'}`}>
                                    {event.status}
                                  </div>
                                </div>
                              </div>

                              <div className="text-[rgb(var(--muted-foreground))] text-sm mt-1">
                                {event.description}
                              </div>
                            </div>

                            <div className='p-6'>
                              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-[rgba(var(--primary),0.05)] to-[rgba(var(--primary-glow),0.05)]">
                                  <Clock className="h-4 w-4 text-primary" />
                                  
                                  <span className="font-medium">
                                    {formatDate(event.event_date)}
                                  </span>
                                </div>

                                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
                                  <MapPin className="h-4 w-4 text-blue-600" />
                                  <span className="font-medium truncate">
                                    {event.location}
                                  </span>
                                </div>

                                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-green-500/5 to-emerald-500/5">
                                  <Users className="h-4 w-4 text-green-600" />
                                  <span className="font-medium">
                                    {event.guest_count} guests
                                  </span>
                                </div>

                                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-orange-500/5 to-red-500/5">
                                  <DollarSign className="h-4 w-4 text-orange-600" />
                                  <span className="font-medium">
                                    {formatCurrency(event.budget || 0)}
                                  </span>
                                </div>
                              </div>

                              <div className="pt-4 border-t border-[rgb(var(--border))]">
                                <button className="inline-flex w-full items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-9 px-4 btn-hero interactive-element cursor-pointer" onClick={() => navigate(`/events/${event._id}`)}  >
                                  <Sparkles className="h-4 w-4 mr-2" />
                                  View Event Details
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "bookings" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Your Bookings
                      </h3>

                      <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-6 cursor-pointer' onClick={() => navigate('/vendors')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Find Vendors
                      </button>
                    </div>
                    
                    {bookings.length === 0 ? (
                      <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                        <div className="text-center p-6 py-12">
                          <Star className="h-12 w-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4" />

                          <h4 className="text-lg font-semibold mb-2">
                            No bookings yet
                          </h4>

                          <p className="text-[rgb(var(--muted-foreground))] mb-4">
                            Browse vendors and book services for your events.
                          </p>

                          <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-6 cursor-pointer' onClick={() => navigate('/vendors')}>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Browse Vendors
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {bookings.map((booking) => (
                          <div key={booking._id} className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-hover">
                            <div className='flex flex-col space-y-1.5 p-6'>
                              <div className="flex items-center justify-between">
                                
                                <div className="font-semibold leading-none tracking-tight text-lg">
                                  {booking.vendor_id?.business_name}
                                </div>

                                <div className={`inline-flex items-center rounded-full text-xs font-medium px-3 py-0.5 ${booking.status.toLowerCase() === 'confirmed' ? 'border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]' : 'border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'}`}>
                                  {booking.status}
                                </div>
                              </div>

                              <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                                {(booking.vendor_id?.category).charAt(0).toUpperCase() + (booking.vendor_id?.category).slice(1)} • {formatCurrency(booking.total_amount)}
                              </div>
                            </div>

                            <div className='p-6 pt-0'>
                              <p className="text-sm text-[rgb(var(--muted-foreground))] mb-2">
                                {booking.service_description}
                              </p>

                              <div className="flex items-center space-x-2 text-sm">
                                <Clock className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                                <span>Booked for {formatDate(booking.booking_date)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}               
              </div>  
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant animate-slide-up">
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <div className="p-2 gradient-primary rounded-lg animate-float">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gradient">Quick Actions</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-11 w-full btn-hero interactive-element cursor-pointer" onClick={() => {navigate('/create-event'); scrollTo(0,0)}}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Event
                </button>

                <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 w-full interactive-element cursor-pointer" onClick={() => navigate('/vendors')}>
                  <Star className="h-4 w-4 mr-2" />
                  Browse Vendors
                </button>

                <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 w-full interactive-element cursor-pointer" onClick={() => navigate('/calendar')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </button>

                <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 w-full interactive-element cursor-pointer" onClick={() => navigate('/analytics')}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  View Analytics
                </button>
              </div>
            </div>

            {upcomingEvents.length > 0 && (
              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex flex-col space-y-1.5 p-6 pb-3">
                  <div className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-gradient">Next Event</span>
                  </div>
                </div>

                <div className='p-6'>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-[rgba(var(--primary),0.1)] to-[rgba(var(--primary-glow),0.1)] border border-[rgba(var(--primary-glow),0.2)]">
                      <h4 className="font-semibold text-gradient mb-2">
                        {upcomingEvents[0].title}
                      </h4>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">{formatDate(upcomingEvents[0].event_date)}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium truncate">{upcomingEvents[0].location}</span>
                        </div>
                      </div>
                    </div>

                    <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-9 px-6 cursor-pointer w-full btn-hero interactive-element" onClick={() => navigate(`/events/${upcomingEvents[0]._id}`)}  >
                      <Sparkles className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard