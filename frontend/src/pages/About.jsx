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

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgb(var(--accent),0.5)] to-[rgba(var(--accent-foreground),0.1)]">
      <h1>Vendors Page</h1>
    </div>
  )
}

export default Vendors;