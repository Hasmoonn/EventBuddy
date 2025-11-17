import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Mail, MapPin, MessageCircle, Phone, Search, Star } from 'lucide-react'
import toast from 'react-hot-toast';
import {categoryIcons} from '../assets/assets.js'
import axios from "axios"

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
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(var(--primary))] mx-auto"></div>
          <p className="text-[rgb(var(--muted-foreground))]">Loading vendors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[rgb(var(--accent),0.5)] to-[rgba(var(--accent-foreground),0.1)]">
      {/* Header */}
      <header className="fixed top-2 left-3 right-3 z-50 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 gradient-primary rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">
                  EventBuddy
                </h1>
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]">
                  Vendor Marketplace
                </div>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <button className='hidden sm:inline-flex py-1.5 px-6 rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 cursor-pointer'>Sign In</button>
              </Link>
              <Link to="/dashboard">
                <button className="inline-flex items-center justify-center gap-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 btn-hero">Dashboard</button>
              </Link>
            </div>
          </div>
        </div>
      </header>


      <div className="max-w-7xl mx-auto px-4 py-8 pt-32">
        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Discover
              <span className="text-gradient"> Trusted Vendors</span>
            </h2>
            <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              Browse our curated network of verified vendors for your perfect event.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
              <input placeholder="Search vendors..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-sm ring-offset-background placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10" />
            </div>

            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className='flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-sm ring-offset-background placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' placeholder="Category">
              <option value="all">All Categories</option>
              <option value="photography">Photography</option>
              <option value="catering">Catering</option>
              <option value="entertainment">Entertainment</option>
              <option value="decoration">Decoration</option>
              <option value="venue">Venue</option>
              <option value="transportation">Transportation</option>
            </select>

            <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className='flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-sm ring-offset-background placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' placeholder="Location">
              <option value="all">All Locations</option>
              {uniqueLocations.map((location) => (
                <option key={location} value={location.toLowerCase()}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>


        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[rgb(var(--muted-foreground))]">
              Showing {filteredVendors.length} of {vendors.length} vendors
            </p>
          </div>

          {
            filteredVendors.length === 0 ? (
              <div className='rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm'>
                <div className="p-6 text-center py-12">
                  <Search className="h-12 w-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">No vendors found</h4>
                  <p className="text-[rgb(var(--muted-foreground))]">
                    Try adjusting your search criteria to find more vendors.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor, index) => {
                const IconComponent = getIconForCategory(vendor.category)
                
                return (
                  <Link to={`/vendors/${vendor.id}`} key={vendor.id} className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-vendor animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }} >
                    <div className="flex flex-col space-y-1.5 p-6 pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12">
                            <div className='flex h-full w-full items-center justify-center rounded-full bg-[rgb(var(--muted))]'>
                              <IconComponent className="h-6 w-6 text-[rgb(var(--primary))]" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-all text-xs ${vendor.verified ? "border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]" : "border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]"}`} >
                                {vendor.verified ? "Verified" : "New"}
                              </div>

                              <div 
                                variant={vendor.available ? "default" : "destructive"} 
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-all text-xs ${vendor.available ? "border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]" : "border-transparent bg-[rgb(var(--destructive))] text-[rgb(var(--destructive-foreground))] hover:bg-[rgba(var(--destructive),0.8)]"}`} >
                                  {vendor.available ? "Available" : "Booked"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="font-semibold tracking-tight text-lg leading-tight">
                        {vendor.business_name}
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-[rgb(var(--muted-foreground))]">
                        <MapPin className="h-3 w-3" />
                        <span>{vendor.location}</span>
                      </div>
                    </div>
                    
                    <div className="p-6 pt-0 space-y-4">
                      {vendor.description && (
                        <p className="text-sm text-[rgb(var(--muted-foreground))] line-clamp-2">
                          {vendor.description}
                        </p>
                      )}

                      {/* Rating */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{vendor.rating || 'New'}</span>
                          {vendor.total_reviews > 0 && (
                            <span className="text-sm text-[rgb(var(--muted-foreground))]">
                              ({vendor.total_reviews})
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-[rgb(var(--primary))]">
                          {formatCurrency(vendor.price_range_min, vendor.price_range_max)}
                        </span>
                      </div>

                      {/* Services */}
                      {vendor.services && vendor.services.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {vendor.services.slice(0, 3).map((service) => (
                            <div key={service} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all text-[rgb(var(--foreground))]">
                              {service}
                            </div>
                          ))}
                          {vendor.services.length > 3 && (
                            <div variant="outline" className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all text-[rgb(var(--foreground))]">
                              +{vendor.services.length - 3} more
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <button size="sm" variant="outline" className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-4 py-2 flex-1 text-xs" onClick={() => handleMessage(vendor)}
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Message
                          </button>
                          {vendor.contact_phone && (
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-4 py-2 flex-1 text-xs"
                              onClick={() => handleCall(vendor)}
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              Call
                            </button>
                          )}
                          {vendor.contact_email && (
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-4 py-2 flex-1 text-xs" onClick={() => handleEmail(vendor)} >
                              <Mail className="h-3 w-3 mr-1" />
                              Email
                            </button>
                          )}
                        </div>
                        
                        <button className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-300 h-9 rounded-lg px-4 py-2 w-full btn-hero text-xs disabled:cursor-not-allowed" disabled={!vendor.available} onClick={() => handleBooking(vendor)}
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          {vendor.available ? "Check Availability" : "Not Available"}
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Vendors