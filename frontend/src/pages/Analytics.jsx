import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Star,
  Sparkles,
  Settings,
  LogOut,
  RefreshCw
} from 'lucide-react';

const Analytics = () => {
  const { backendUrl, user, setUser, setIsAuthenticated, navigate, loading, setLoading } = useContext(AuthContext);
  const [analytics, setAnalytics] = useState(null);
  const [vendorAnalytics, setVendorAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else if (user) {
      fetchAnalytics();
      if (user.is_vendor) {
        fetchVendorAnalytics();
      }
    }
  }, [user]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/analytics/user`);
      if (data.success) {
        setAnalytics(data.analytics);
      } else {
        toast.error(data.message || 'Failed to load analytics');
      }
    } catch (error) {
      toast.error(error.message || 'Error loading analytics');
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorAnalytics = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/analytics/vendor`);
      if (data.success) {
        setVendorAnalytics(data.analytics);
      }
    } catch (error) {
      console.log('Vendor analytics not available');
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        setIsAuthenticated(false);
        navigate('/auth');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
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
      month: 'short',
      day: 'numeric',
    });
  };

  // Prepare chart data
  const eventsByStatusData = analytics?.eventsByStatus?.map(item => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count,
    color: item._id === 'confirmed' ? '#10B981' : item._id === 'pending' ? '#F59E0B' : item._id === 'cancelled' ? '#EF4444' : '#6B7280'
  })) || [];

  const bookingsByStatusData = analytics?.bookingsByStatus?.map(item => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count,
    color: item._id === 'Confirmed' ? '#10B981' : item._id === 'Pending' ? '#F59E0B' : '#EF4444'
  })) || [];

  const monthlyEventsData = analytics?.monthlyEvents?.map(item => ({
    month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
    events: item.count
  })) || [];

  const eventTypesData = analytics?.eventTypes?.map(item => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count
  })) || [];

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
            <div onClick={() => { navigate('/'); scrollTo(0, 0) }} className="flex items-center space-x-3 cursor-pointer">
              <div className="p-3 gradient-primary rounded-2xl animate-float">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-shimmer">
                  EventBuddy
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="inline-flex items-center border font-semibold transition-all text-xs px-2 py-1 rounded-full border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]">
                    Analytics
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

              <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-4 interactive-element cursor-pointer" onClick={fetchAnalytics}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
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
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                {analytics?.totalEvents || 0}
              </div>
              <div className="flex items-center space-x-2">
                <span className="status-dot status-confirmed"></span>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">
                  {analytics?.upcomingEvents || 0} upcoming
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-stats animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="leading-none tracking-tight text-sm font-medium text-[rgb(var(--muted-foreground))]">
                Total Revenue
              </div>
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg animate-float">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className='p-6 pt-0'>
              <div className="text-3xl font-bold text-gradient mb-1">
                {formatCurrency(analytics?.totalRevenue || 0)}
              </div>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                From confirmed bookings
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-stats animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="leading-none tracking-tight text-sm font-medium text-[rgb(var(--muted-foreground))]">
                Total Bookings
              </div>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg animate-float">
                <Users className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className='p-6 pt-0'>
              <div className="text-3xl font-bold text-gradient mb-1">
                {analytics?.totalBookings || 0}
              </div>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                Vendor services booked
              </p>
            </div>
          </div>

          <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-stats animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="leading-none tracking-tight text-sm font-medium text-[rgb(var(--muted-foreground))]">
                Avg Budget
              </div>
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg animate-float">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className='p-6 pt-0'>
              <div className="text-3xl font-bold text-gradient mb-1">
                {formatCurrency(analytics?.avgBudget || 0)}
              </div>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                Per event
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="inline-flex border items-center justify-center rounded-md bg-[rgba(var(--accent-foreground),0.2)] p-1 text-[rgb(var(--muted-foreground))]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`inline-flex items-center justify-center rounded-sm px-6 py-2 text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-md' : 'text-[rgb(var(--muted-foreground))'} cursor-pointer`}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`inline-flex items-center justify-center rounded-sm px-6 py-2 text-sm font-medium transition-all ${activeTab === 'events' ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-md' : 'text-[rgb(var(--muted-foreground))'} cursor-pointer`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`inline-flex items-center justify-center rounded-sm px-6 py-2 text-sm font-medium transition-all ${activeTab === 'bookings' ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-md' : 'text-[rgb(var(--muted-foreground))'} cursor-pointer`}
            >
              <Star className="h-4 w-4 mr-2" />
              Bookings
            </button>
            {user?.is_vendor && (
              <button
                onClick={() => setActiveTab('vendor')}
                className={`inline-flex items-center justify-center rounded-sm px-6 py-2 text-sm font-medium transition-all ${activeTab === 'vendor' ? 'bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-md' : 'text-[rgb(var(--muted-foreground))'} cursor-pointer`}
              >
                <Activity className="h-4 w-4 mr-2" />
                Vendor
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Events Status Pie Chart */}
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="text-lg font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <PieChartIcon className="h-5 w-5 text-primary" />
                  <span className="text-gradient">Events by Status</span>
                </div>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={eventsByStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {eventsByStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Events Trend */}
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="text-lg font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-gradient">Monthly Event Creation</span>
                </div>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyEventsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="events" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bookings Status Bar Chart */}
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="text-lg font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span className="text-gradient">Bookings by Status</span>
                </div>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bookingsByStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Event Types Distribution */}
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="text-lg font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span className="text-gradient">Event Types</span>
                </div>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={eventTypesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#ffc658"
                      dataKey="value"
                    >
                      {eventTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="text-lg font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-gradient">Recent Events</span>
                </div>
              </div>
              <div className="p-6">
                {analytics?.recentEvents?.length > 0 ? (
                  <div className="space-y-4">
                    {analytics.recentEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-[rgba(var(--primary),0.05)] to-[rgba(var(--primary-glow),0.05)] border border-[rgba(var(--primary-glow),0.2)]">
                        <div>
                          <h4 className="font-semibold text-gradient">{event.title}</h4>
                          <p className="text-sm text-[rgb(var(--muted-foreground))]">
                            {formatDate(event.event_date)} • {event.status}
                          </p>
                        </div>
                        <button
                          className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-4 cursor-pointer"
                          onClick={() => navigate(`/events/${event._id}`)}
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4" />
                    <p className="text-[rgb(var(--muted-foreground))]">No events found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="text-lg font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <Star className="h-5 w-5 text-primary" />
                  <span className="text-gradient">Booking Analytics</span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gradient">{analytics?.totalBookings || 0}</div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Total Bookings</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analytics?.bookingsByStatus?.find(s => s._id === 'Confirmed')?.count || 0}</div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Confirmed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{analytics?.bookingsByStatus?.find(s => s._id === 'Pending')?.count || 0}</div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Pending</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vendor' && user?.is_vendor && vendorAnalytics && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-stats">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-3">
                  <div className="leading-none tracking-tight text-sm font-medium text-[rgb(var(--muted-foreground))]">
                    Total Bookings
                  </div>
                  <div className="p-2 gradient-primary rounded-lg animate-float">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className='p-6 pt-0'>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {vendorAnalytics.totalBookings || 0}
                  </div>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">Received</p>
                </div>
              </div>

              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-stats">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-3">
                  <div className="leading-none tracking-tight text-sm font-medium text-[rgb(var(--muted-foreground))]">
                    Total Revenue
                  </div>
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg animate-float">
                    <DollarSign className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className='p-6 pt-0'>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {formatCurrency(vendorAnalytics.totalRevenue || 0)}
                  </div>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">Earned</p>
                </div>
              </div>

              <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-stats">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-3">
                  <div className="leading-none tracking-tight text-sm font-medium text-[rgb(var(--muted-foreground))]">
                    Rating
                  </div>
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg animate-float">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className='p-6 pt-0'>
                  <div className="text-3xl font-bold text-gradient mb-1">
                    {vendorAnalytics.vendorInfo?.rating?.toFixed(1) || 0}
                  </div>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">Average rating</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
              <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="text-lg font-semibold leading-none tracking-tight flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span className="text-gradient">Recent Bookings</span>
                </div>
              </div>
              <div className="p-6">
                {vendorAnalytics.recentBookings?.length > 0 ? (
                  <div className="space-y-4">
                    {vendorAnalytics.recentBookings.map((booking, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-[rgba(var(--primary),0.05)] to-[rgba(var(--primary-glow),0.05)] border border-[rgba(var(--primary-glow),0.2)]">
                        <div>
                          <h4 className="font-semibold text-gradient">{booking.user_id?.name}</h4>
                          <p className="text-sm text-[rgb(var(--muted-foreground))]">
                            {booking.event_id?.title} • {formatCurrency(booking.total_amount)} • {booking.status}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{formatDate(booking.booking_date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4" />
                    <p className="text-[rgb(var(--muted-foreground))]">No bookings yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
