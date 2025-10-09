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

  useEffect(() => {
    fetchVendors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading vendors...</p>
      </div>
    );
  }

  return <div>Vendors Component Initialized</div>
}

export default Vendors
