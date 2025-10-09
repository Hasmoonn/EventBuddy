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

  useEffect(() => {
    if (id) {
      fetchVendor();
    }
  }, [id]);

  // Minimal return to avoid syntax errors in Step 1
  return <div>VendorProfile Component Initialized</div>
}

export default VendorProfile
