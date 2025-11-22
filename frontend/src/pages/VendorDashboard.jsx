import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { HashLoader } from 'react-spinners';
import { Building, Calendar, DollarSign, Edit, Mail, MapPin, MessageSquare, Phone, Star, TrendingUp } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const VendorDashboard = () => {
  const {backendUrl, user, loading, setLoading, navigate} = useContext(AuthContext);

  const [vendorProfile, setVendorProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  const [analytics, setAnalytics] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
    responseRate: 95,
    monthlyBookings: 0
  });

  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    business_name: '',
    description: '',
    services: [],
    contact_email: '',
    contact_phone: '',
    price_range_min: '',
    price_range_max: '',
    location: ''
  });

  useEffect(() => {
    if(!user?.is_vendor) {
      navigate('/vendor/create-vendor');
    }

    fetchVendorData()
  }, [user]);


  const fetchVendorData = async () => {
    setLoading(true)

    try {

      if (!user)
        return;

      // Fetch vendor profile
      const {data} = await axios.get(backendUrl + '/api/vendors/dashboard')

      if (!data.success) {
        return toast.error(data.message)
      }

      setVendorProfile(data.vendorProfile)
      setBookings(data.bookings || [])
      setReviews(data.reviews || [])
      setAnalytics(data.analytics)

      setEditForm({
        business_name: data.vendorProfile.business_name || '',
        description: data.vendorProfile.description || '',
        services: data.vendorProfile.services || [],
        contact_email: data.vendorProfile.contact_email || '',
        contact_phone: data.vendorProfile.contact_phone || '',
        price_range_min: data.vendorProfile.price_range_min?.toString() || '',
        price_range_max: data.vendorProfile.price_range_max?.toString() || '',
        location: data.vendorProfile.location || ''
      });

    } catch (error) {
        toast.error(error.message)
    } finally{
      setLoading(false)
    }
  };


  const updateVendorProfile = async () => {
    try {

      if (!user) {
        return
      }
      
      const {data} = await axios.put(backendUrl + '/api/vendors/update', editForm)

      if (!data.success) {
        return toast.error(data.message)
      }

      setIsEditing(false);
      fetchVendorData();

      toast.success(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  };


  const updateBookingStatus = async (bookingId, status) => {
    try {
      const {data} = await axios.put(backendUrl + `/api/vendors/bookings/${bookingId}/status`, { status })

      if (!data.success) {
        return toast.error(data.message)
      }

       // Update local state
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status } : b)
      );

      toast.success(data.message);
      fetchVendorData();
    } catch (error) {
      toast.error(error.message)
    }
  };


  const handleCreateProfile = () => {
    navigate('/vendor/create-vendor');
  };


  if (!vendorProfile && user?.is_vendor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm' >
          <div className="p-8 text-center">
            <Building className="h-12 w-12 mx-auto mb-4 text-[rgb(var(--muted-foreground))]" />
            <h2 className="text-xl font-semibold mb-2">Create Your Vendor Profile</h2>
            <p className="text-[rgb(var(--muted-foreground))] mb-4">
              Set up your vendor profile to start receiving bookings
            </p>

            <button onClick={handleCreateProfile} className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-11 px-6 py-3'>
              Create Profile
            </button>
          </div>
        </div>
      </div>
    );
  }


  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <HashLoader color='#D8B4FE' />
      </div> 
    );
  }

  if (!vendorProfile) {
    return null
  }


  return (
    <div className='min-h-screen bg-gradient-to-br from-[rgb(var(--background))] to-[rgba(var(--accent),0.3)]'>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8 items-start">
          <div>
            <h1 className="text-3xl font-bold text-gradient">
              Vendor Dashboard
            </h1>
            <p className="text-[rgb(var(--muted-foreground))]">
              Manage your business and track performance
            </p>
          </div>

          <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all ${vendorProfile.verified ? "border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]" : "border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]"}`} >
            {vendorProfile.verified ? 'Verified' : 'Pending Verification'}
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="text-sm font-medium">Total Bookings</div>
              <Calendar className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            </div>
            <div className='p-6 pt-0'>
              <div className="text-2xl font-bold">
                {analytics.totalBookings}
              </div>

              <div className="flex items-center text-xs text-[rgb(var(--muted-foreground))]">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +12% from last month
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="leading-none tracking-tight text-sm font-medium">Total Revenue</div>
              <DollarSign className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            </div>
            <div className='p-6 pt-0'>
              <div className="text-2xl font-bold">LKR {analytics.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-[rgb(var(--muted-foreground))]">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                +18% from last month
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="leading-none tracking-tight text-sm font-medium">
                Average Rating
              </div>
              <Star className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            </div>

            <div className='p-6 pt-0'>
              <div className="text-2xl font-bold">
                {analytics.averageRating}/5
              </div>
              <div className="flex items-center text-xs text-[rgb(var(--muted-foreground))]">
                <span>{reviews.length} reviews</span>
              </div>
            </div>
          </div>

          <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
            <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
              <div className="leading-none tracking-tight text-sm font-medium">Response Rate</div>
              <MessageSquare className="h-4 w-4 text[rgb(var(--muted-foreground))]" />
            </div>
            <div className='p-6 pt-0'>
              <div className="text-2xl font-bold">{analytics.responseRate}%</div>
              <div className="flex items-center text-xs text-[rgb(var(--muted-foreground))]">
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                Above average
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="grid w-full grid-cols-4 bg-[rgba(var(--accent-foreground),0.2)] p-1 rounded-md text-[rgb(var(--muted-foreground))]">
            {["profile", "bookings", "reviews", "analytics"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all cursor-pointer
                          ${activeTab === tab
                    ? "bg-[rgb(var(--background))] text-[rgb(var(--foreground))] shadow-sm"
                    : "text-[rgb(var(--muted-foreground))]"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "profile" && vendorProfile && (
            <div className="space-y-6">
              {/* Profile content (same as your TabsContent for profile) */}
              <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                <div className='flex justify-between items-center pr-6'>
                  <div className='flex flex-col space-y-1.5 p-6'>
                    <div className='text-2xl font-semibold leading-none tracking-tight text-gradient'>Business Profile</div>
                    <div className='text-sm text-[rgb(var(--muted-foreground))]'>Manage your business information and settings</div>
                  </div>

                  <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 px-6 py-3  cursor-pointer' onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="p-6 pt-0 space-y-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Business Name</label>
                        <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' value={editForm.business_name} onChange={(e) => setEditForm({ ...editForm, business_name: e.target.value })} />
                      </div>

                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea className='flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                          value={editForm.description}
                          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                          rows={4}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                            type="email"
                            value={editForm.contact_email}
                            onChange={(e) => setEditForm({ ...editForm, contact_email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Phone</label>
                          <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                            value={editForm.contact_phone}
                            onChange={(e) => setEditForm({ ...editForm, contact_phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Min Price</label>
                          <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                            type="number"
                            value={editForm.price_range_min}
                            onChange={(e) => setEditForm({ ...editForm, price_range_min: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Max Price</label>
                          <input className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                            type="number"
                            value={editForm.price_range_max}
                            onChange={(e) => setEditForm({ ...editForm, price_range_max: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-11 py-3 px-6 cursor-pointer' onClick={updateVendorProfile}>
                          Save Changes
                        </button>

                        <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 py-3 px-6 cursor-pointer' onClick={() => setIsEditing(false)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {vendorProfile.business_name}
                        </h3>

                        <p className="text-[rgb(var(--muted-foreground))]">
                          {vendorProfile.description}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                            <span>{vendorProfile.contact_email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                            <span>{vendorProfile.contact_phone}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                            <span>{vendorProfile.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                            <span>
                              Lkr {vendorProfile.price_range_min?.toLocaleString()} - Lkr {vendorProfile.price_range_max?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Services</h4>
                        <div className="flex flex-wrap gap-2">
                          {vendorProfile.services?.map((service, index) => (
                            <span key={index} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))]">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Bookings content */}
              <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                <div className='flex flex-col space-y-1.5 p-6'>
                  <div className='text-2xl font-semibold leading-none tracking-tight text-gradient'>Recent Bookings</div>
                  <div className='text-sm text-[rgb(var(--muted-foreground))]'>Manage your booking requests and confirmations</div>
                </div>
                <div className='p-6 pt-0'>
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking._id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{booking.event_id?.title}</h4>
                            <p className="text-sm text-[rgb(var(--muted-foreground))]">
                              by {booking.user_id?.name}
                            </p>
                          </div>
                          <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all ${booking.status.toLowerCase() === 'confirmed' ? 'bg-green-100 text-green-800' : booking.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' : booking.status.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'} `}>
                            {booking.status}
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium">
                              Service Date:
                            </span>
                            <p>
                              {new Date(booking.booking_date).toLocaleDateString()}
                            </p>
                          </div>

                          <div>
                            <span className="font-medium">
                              Amount:
                            </span>
                            <p>
                              Lkr. {Number(booking.total_amount).toLocaleString()}
                            </p>
                          </div>

                          <div>
                            <span className="font-medium">Event Type:</span>
                            <p>{booking.event_id?.event_type || 'N/A'}</p>
                          </div>

                          {booking.service_description && (
                            <div className="mt-2">
                              <span className="font-medium text-sm">Service Description:</span>
                              <p className="text-sm text-[rgb(var(--muted-foreground))]">{booking.service_description}</p>
                            </div>
                          )}
                        </div>

                        {booking.status.toLowerCase() === 'pending' && (
                          <div className="flex space-x-2 mt-4">
                            <button className='inline-flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-9 rounded-lg px-4 py-2 cursor-pointer'
                              onClick={() => updateBookingStatus(booking._id, 'Confirmed')}
                            >
                              Accept
                            </button>

                            <button className='inline-flex items-center justify-center transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 rounded-lg px-4 py-2 cursor-pointer'
                              onClick={() => updateBookingStatus(booking._id, 'Cancelled')}
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {/* Reviews content */}
              <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                <div className='flex flex-col space-y-1.5 p-6'>
                  <div className='text-2xl font-semibold leading-none tracking-tight text-gradient'>Customer Reviews</div>
                  <div className='text-sm text-[rgb(var(--muted-foreground))]'>See what customers are saying about your services</div>
                </div>
                <div className='p-6 pt-0'>
                  <div className="space-y-4">
                    {reviews.map((review, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start space-x-4">
                          <div className="h-10 w-10 gradient-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {review.user_id?.name?.[0]?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{review.profiles?.full_name}</h4>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                      }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-[rgb(var(--muted-foreground))]">{review.comment}</p>
                            <p className="text-xs text-[rgb(var(--muted-foreground))] mt-2">
                              {new Date(review.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}


          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Analytics content */}
          <div className="grid md:grid-cols-2 gap-6">
                <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                  <div className='flex flex-col space-y-1.5 p-6'>
                    <div className='text-2xl font-semibold leading-none tracking-tight text-gradient'>
                      Performance Metrics
                    </div>
                  </div>

                  <div className='p-6 pt-0'>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Booking Conversion Rate
                        </span>

                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'>
                          {analytics.bookingConversionRate}%
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Average Response Time
                        </span>

                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'>
                          {analytics.responseRate}% response rate
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Repeat Customer Rate
                        </span>

                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'>
                          {analytics.repeatCustomerRate}%
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Total Reviews
                        </span>

                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'>
                          {analytics.totalReviews}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                  <div className='flex flex-col space-y-1.5 p-6'>
                    <div className='text-2xl font-semibold leading-none tracking-tight text-gradient'>
                      Monthly Trends
                    </div>
                  </div>

                  <div className='p-6 pt-0'>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          This Month's Bookings
                        </span>

                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]' >
                          {analytics.monthlyBookings}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Monthly Revenue
                        </span>

                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'>
                          Lkr {analytics.monthlyRevenue.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Total Bookings
                        </span>

                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'>
                          {analytics.totalBookings}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Total Revenue
                        </span>

                        <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]'>
                          Lkr {analytics.totalRevenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default VendorDashboard