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

  return <div>Vendors Component with Filtering Logic</div>
}

export default Vendors
