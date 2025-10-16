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

  return (
    <div>VendorDashboard</div>
  )
}

export default VendorDashboard