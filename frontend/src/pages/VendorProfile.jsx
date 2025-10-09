import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { vendors } from '../assets/assets';
import BookingDialog from '../components/BookingDialog';
import { ArrowLeft, Calendar, Mail, MapPin, MessageCircle, Phone, Shield, Star } from 'lucide-react';
import ReviewList from '../components/ReviewList';

const VendorProfile = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio"); // 👈 Simple tab system


  const fetchVendor = async () => {
    if (!id) 
      return;
    
    try {
      const foundVendor = vendors.find((v) => v.id === id);
      setVendor(foundVendor || null);
    } catch (error) {
      toast.error(error.message)
      navigate("/vendors");
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = () => {
    if (vendor?.contact_email) {
      window.location.href = `mailto:${vendor.contact_email}?subject=Inquiry about your services`;
    }
  };

  const handleCall = () => {
    if (vendor?.contact_phone) {
      window.location.href = `tel:${vendor.contact_phone}`;
    }
  };

  const formatPrice = (min, max) => {
    if (min && max) {
      return `$ ${min.toLocaleString()} - $ ${max.toLocaleString()}`;
    }
    return "Contact for pricing";
  };


  useEffect(() => {
    if (id) {
      fetchVendor();
    }
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--background))] to-[rgba(var(--accent),0.2)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(var(--primary))] mx-auto mb-4"></div>
          <p className="text-[rgb(var(--muted-foreground))]">
            Loading vendor profile...
          </p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--background))] to-[rgba(var(--accent),0.2)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            Vendor not found
          </h2>

          <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300' onClick={() => navigate("/vendors")}>
            Browse All Vendors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--background))] to-[rgba(var(--accent),0.3)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button variant="ghost" onClick={() => navigate("/vendors")}
          className="mb-6 inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-[rgb(var(--accent))] text-[rgb(var(--accent-foreground))] hover:scale-105 active:scale-95 h-11 px-6 py-3 cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vendors
        </button>
      </div>
    </div>
  )
}

export default VendorProfile
