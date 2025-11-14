import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import BookingDialog from '../components/BookingDialog';
import { ArrowLeft, Calendar, Mail, MapPin, MessageCircle, Phone, Shield, Star } from 'lucide-react';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const VendorProfile = () => {

  const { id } = useParams();

  const {backendUrl, loading, setLoading, navigate} = useContext(AuthContext);
  
  const [vendor, setVendor] = useState(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewKey, setReviewKey] = useState(0);


  const fetchVendor = async () => {
    setLoading(true)

    if (!id) 
      return;
    
    try {
      const {data} = await axios.get(backendUrl + `/api/vendors/${id}`, { credentials: "include" });

      if (data.success) {
        setVendor(data.vendor || null);
      } else {
        toast.error(data.message);
        navigate("/vendors");
      }
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
      return `LKR ${min.toLocaleString()} - LKR ${max.toLocaleString()}`;
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

          <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer px-3 py-2 bg-purple-400 text-white hover:bg-purple-500 hover:shadow-md' onClick={() => navigate("/vendors")}>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vendor Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-vendor">
              <div className="p-6 pt-3">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex shrink-0 overflow-hidden rounded-full h-16 w-16">
                    <img src={vendor.image} className='w-full object-cover' />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold">
                        {vendor.business_name}
                      </h1>
                      {vendor.verified && (
                        <div className="bg-[rgba(var(--primary),0.1)] text-[rgb(var(--primary))] border-[rgba(var(--primary),0.2)] inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-[rgb(var(--muted-foreground))] mb-2">
                      <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]' >
                        {(vendor.category).charAt(0).toUpperCase() + (vendor.category).slice(1)}
                      </div>

                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {vendor.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {vendor.rating.toFixed(1)}
                        </span>

                        <span className="text-[rgb(var(--muted-foreground))]">
                          ({vendor.total_reviews} reviews)
                        </span>
                      </div>

                      <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${vendor.available ? "border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]" : "border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]"}`}>
                        {vendor.available ? "Available" : "Not Available"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">
                    About
                  </h3>
                  <p className="text-[rgb(var(--muted-foreground))]">
                    {vendor.description}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">
                    Services
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {vendor.services?.map((service, index) => (
                      <div key={index} className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all text-[rgb(var(--foreground))]' >
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Price Range</h3>
                      <p className="text-lg font-bold text-[rgb(var(--primary))]">
                        {formatPrice(vendor.price_range_min, vendor.price_range_max)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-4 border-b">
                <button onClick={() => setActiveTab("portfolio")} className={`py-2 cursor-pointer ${activeTab === "portfolio" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`} >
                  Portfolio
                </button>

                <button onClick={() => setActiveTab("reviews")} className={`py-2 cursor-pointer ${activeTab === "reviews" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`} >
                  Reviews
                </button>
              </div>
              
              <div className="mt-4">
                {activeTab === "portfolio" && ( 
                  <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-vendor">
                  <div className='flex flex-col space-y-1.5 p-6'>
                    <div className='text-2xl font-semibold leading-none tracking-tight'>
                      Portfolio
                    </div>
                    <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                      Previous work and showcase
                    </div>
                  </div>
                  <div className='p-6 pt-0'>
                    {vendor.portfolio_images && vendor.portfolio_images.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {vendor.portfolio_images.map((image, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden">
                            <img src={image} alt={`Portfolio ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform"  />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[rgb(var(--muted-foreground))]">
                        No portfolio images available.
                      </p>
                    )}
                  </div>
                </div>
                )}                
              </div>
              
              {activeTab === "reviews" && (
                <div key={reviewKey}>
                  <ReviewList
                    vendorId={vendor._id}
                    onShowReviewForm={() => setShowReviewForm(true)}
                    onEditReview={(review) => setEditingReview(review)}
                  />
                </div>
              )}
              
            </div>
          </div>

          {/* Contact & Booking */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-vendor">
              <div className='flex flex-col space-y-1.5 p-6'>
                <div className='text-2xl font-semibold leading-none tracking-tight'>
                  Contact Information
                </div>
              </div>
              <div className="p-6 pt-0 space-y-4">
                {vendor.contact_email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
                    <span className="text-sm">
                      {vendor.contact_email}
                    </span>
                  </div>
                )}
                
                {vendor.contact_phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[rgb(var(--muted-foreground))]" />
                    <span className="text-sm">{vendor.contact_phone}</span>
                  </div>
                )}
                
              </div>
            </div>

            <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-vendor">
              <div className='flex flex-col space-y-1.5 p-6'>
                <div className='text-2xl font-semibold leading-none tracking-tight'>
                  Get in Touch
                </div>
                <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                  Contact this vendor for your event
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <button className="w-full inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-11" onClick={() => setShowBookingDialog(true)}  disabled={!vendor.available}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {vendor.available ? "Request Booking" : "Currently Unavailable"}
                </button>
                
                <button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 cursor-pointer" onClick={handleMessage} disabled={!vendor.contact_email}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </button>
                
                <button className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 cursor-pointer"  onClick={handleCall} disabled={!vendor.contact_phone}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingDialog vendor={vendor} open={showBookingDialog} onClose={() => setShowBookingDialog(false)} />

      {showReviewForm && (
        <ReviewForm
          vendorId={vendor._id}
          review={null}
          onClose={() => setShowReviewForm(false)}
          onSuccess={() => {
            setShowReviewForm(false);
            setReviewKey(prev => prev + 1);
          }}
        />
      )}

      {editingReview && (
        <ReviewForm
          vendorId={vendor._id}
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onSuccess={() => {
            setEditingReview(null);
            setReviewKey(prev => prev + 1);
          }}
        />
      )}
    </div>
  )
}

export default VendorProfile