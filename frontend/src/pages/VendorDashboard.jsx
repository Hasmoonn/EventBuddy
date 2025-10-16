import React, { useEffect, useState } from 'react'
import { booking, reviewsData } from '../assets/assets';
import toast from 'react-hot-toast';
import { Building, Calendar, DollarSign, Edit, Mail, MapPin, MessageSquare, Phone, Star, TrendingUp } from 'lucide-react';

const VendorDashboard = () => {
  const [vendorProfile, setVendorProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(true);

  const [analytics, setAnalytics] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
    responseRate: 95
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    business_name: '',
    description: '',
    services: [],
    contact_email: '',
    contact_phone: '',
    price_range_min: '',
    price_range_max: ''
  });

  useEffect(() => {
    fetchVendorData();
  }, []);

  const fetchVendorData = async () => {
    try {

      if (!user)
        return;

      // Fetch vendor profile
      const vendor = {
        id: "1",
        business_name: "Elegant Events Decor",
        category: "decoration",
        description:
          "Providing premium wedding and event decoration services with custom themes and designs.",
        location: "Colombo",
        price_range_min: 50000,
        price_range_max: 150000,
        rating: 4.7,
        total_reviews: 120,
        image: "/placeholder.svg",
        portfolio_images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        verified: true,
        available: true,
        contact_email: "contact@elegantevents.com",
        contact_phone: "+94711234567",
        services: ["Wedding Decor", "Corporate Events", "Birthday Parties", "Birthday Parties", "Event Parties"],
        user_id: "U001"
      }

      if (vendor) {
        setVendorProfile(vendor);

        setEditForm({
          business_name: vendor.business_name || '',
          description: vendor.description || '',
          services: vendor.services || [],
          contact_email: vendor.contact_email || '',
          contact_phone: vendor.contact_phone || '',
          price_range_min: vendor.price_range_min?.toString() || '',
          price_range_max: vendor.price_range_max?.toString() || ''
        });

        // Fetch bookings

        setBookings(booking || []);

        // Fetch reviews

        setReviews(reviewsData || []);

        // Calculate analytics
        const totalRevenue = booking?.reduce((sum, booking) =>
          sum + (booking.status === 'confirmed' ? Number(booking.total_amount) : 0), 0) || 0;

        const confirmedBookings = booking?.filter(b => b.status === 'confirmed').length || 0;

        const avgRating = reviewsData?.length > 0
          ? reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length
          : 0;

        setAnalytics({
          totalBookings: confirmedBookings,
          totalRevenue,
          averageRating: Math.round(avgRating * 10) / 10,
          responseRate: 95
        });
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const updateVendorProfile = async () => {
    try {
      // const { data: { user } } = await supabase.auth.getUser();
      // if (!user || !vendorProfile) return;

      // const { error } = await supabase
      //   .from('vendors')
      //   .update({
      //     business_name: editForm.business_name,
      //     description: editForm.description,
      //     services: editForm.services,
      //     contact_email: editForm.contact_email,
      //     contact_phone: editForm.contact_phone,
      //     website_url: editForm.website_url,
      //     price_range_min: editForm.price_range_min ? Number(editForm.price_range_min) : null,
      //     price_range_max: editForm.price_range_max ? Number(editForm.price_range_max) : null
      //   })
      //   .eq('id', vendorProfile.id);

      // if (error) throw error;

      setIsEditing(false);
      fetchVendorData();

      // toast({
      //   title: "Profile Updated",
      //   description: "Your vendor profile has been updated successfully",
      // });
    } catch (error) {
      toast.error(error.message)
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      // const { error } = await supabase
      //   .from('bookings')
      //   .update({ status })
      //   .eq('id', bookingId);

      // if (error) throw error;

      // setBookings(prev => 
      //   prev.map(b => b.id === bookingId ? { ...b, status } : b)
      // );

      // toast({
      //   title: "Booking Updated",
      //   description: `Booking ${status} successfully`,
      // });
    } catch (error) {
      toast.error(error.message)
    }
  };

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'confirmed': return 'bg-green-100 text-green-800';
  //     case 'pending': return 'bg-yellow-100 text-yellow-800';
  //     case 'cancelled': return 'bg-red-100 text-red-800';
  //     default: return 'bg-gray-100 text-gray-800';
  //   }
  // };

  if (!vendorProfile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm' >
          <div className="p-8 text-center">
            <Building className="h-12 w-12 mx-auto mb-4 text-[rgb(var(--muted-foreground))]" />
            <h2 className="text-xl font-semibold mb-2">Create Your Vendor Profile</h2>
            <p className="text-[rgb(var(--muted-foreground))] mb-4">
              Set up your vendor profile to start receiving bookings
            </p>

            <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-11 px-6 py-3'>
              Create Profile
            </button>
          </div>
        </div>
      </div>
    );
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
              <div className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</div>
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
      </div>
    </div>
  )
}

export default VendorDashboard