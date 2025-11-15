import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Mail, MapPin, MessageCircle, Phone, Search, Star } from 'lucide-react'
import toast from 'react-hot-toast';
import {categoryIcons} from '../assets/assets.js'
import axios from "axios"
import { AuthContext } from '../contexts/AuthContext.jsx';
import { HashLoader } from 'react-spinners';

const Vendors = () => {

  const {backendUrl, user, isAuthenticated, loading, setLoading} = useContext(AuthContext);

  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');


  const fetchVendors = async () => {
    setLoading(true)

    try {
      const {data} = await axios.get(backendUrl + '/api/vendors')

      if (!data.success) {
        return toast.error(data.message)
      }

      setVendors(data.vendors)
    } catch (error) {
        toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgb(var(--accent),0.5)] to-[rgba(var(--accent-foreground),0.1)]">
      <h1>Vendors Page</h1>
    </div>
  )
}

export default Vendors