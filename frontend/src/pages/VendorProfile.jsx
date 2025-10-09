import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Mail, MapPin, MessageCircle, Phone, Search, Star } from 'lucide-react'
import toast from 'react-hot-toast';
import { vendors } from '../assets/assets.js'
import { categoryIcons } from '../assets/assets.js'

const Vendors = () => {

  const [vendor, setVendor] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const fetchVendors = async () => {
    setLoading(true)
    try {
      setVendor(vendors)
    } catch (error) {
        toast.error('error occured')
    } finally {
      setLoading(false)
    }
  }

  const filterVendors = async () => {
    try {
      let filtered = vendors;

      if (searchTerm) {
        filtered = filtered.filter(vendor =>
          vendor.business_name.toLowerCase().includes(searchTerm.toLowerCase()) || vendor.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(vendor => vendor.category === selectedCategory);
      }

      if (selectedLocation !== 'all') {
        filtered = filtered.filter(vendor =>
          vendor.location.toLowerCase().includes(selectedLocation.toLowerCase())
        );
      }

      setFilteredVendors(filtered);
        
    } catch (error) {
        toast.error('error occured')
    }
  }

  const formatCurrency = (min, max) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    
    if (min && max) {
      return `${formatter.format(min)} - ${formatter.format(max)}`;
    } else if (min) {
      return `From ${formatter.format(min)}`;
    } else {
      return 'Contact for pricing';
    }
  };

  const handleMessage = (vendor) => {
    toast.success(`Your message to ${vendor.business_name} has been sent. They will contact you soon.`);
  };

  const handleCall = (vendor) => {
    if (vendor.contact_phone) {
      window.open(`tel:${vendor.contact_phone}`, '_self');
    } else {
      toast.error("This vendor hasn't provided a phone number.");
    }
  };

  const handleEmail = (vendor) => {
    if (vendor.contact_email) {
      const subject = encodeURIComponent(`Event Inquiry - ${vendor.business_name}`);
      const body = encodeURIComponent(`Hi,\n\nI'm interested in your services for an upcoming event. Please contact me to discuss details.\n\nThank you!`);
      window.open(`mailto:${vendor.contact_email}?subject=${subject}&body=${body}`, '_self');
    } else {
        toast.error("This vendor hasn't provided an email address.");
    }
  };

  const getIconForCategory = (category) => {
    if (!category) 
      return Star
    const catLower = category.toLowerCase()
    const key = Object.keys(categoryIcons).find((k) =>
      catLower.includes(k.toLowerCase())
    )
    return categoryIcons[key] || Star
  }

  const handleBooking = (vendor) => {
    if (!vendor.available) {
      toast.error("This vendor is currently not taking new bookings.");
      return;
    }
    
    toast.success(`Your booking request to ${vendor.business_name} has been sent. They will contact you to confirm availability.`);
  };

  const uniqueLocations = [...new Set(vendors.map(vendor => vendor.location))];

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    filterVendors();
  }, [vendors, searchTerm, selectedCategory, selectedLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading vendors...</p>
      </div>
    );
  }

  return <div>Vendors Component with Handlers & Utilities</div>
}

export default Vendors
