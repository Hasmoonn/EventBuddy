import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { booking } from '../assets/assets.js';
import { Calendar, Eye, Mail, MapPin, Phone } from 'lucide-react';

const BookingsList = ({ eventId }) => {

  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () =>{

    setLoading(true)

    try {
      setBookings(booking)
    } catch (error) {
        toast.error('error in fetching')
    } finally {
        setLoading(false)
    }
  }

  const totalAmount = bookings.reduce((sum, booking) => sum + (booking.total_amount || 0), 0);
  const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;

  useEffect(() => {
    fetchBookings();
  }, [eventId]);


  if (loading) {
    return (
      <div className="rounded-lg border bg-card text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
        <div className="p-6 pt-0 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(var(--primary))] mx-auto mb-4"></div>
          <p className="text-[rgb(var(--muted-foreground))]">Loading bookings...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
        <div className='flex flex-col space-y-1.5 p-6'>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[rgb(var(--primary))]" />
                Vendor Bookings ({bookings.length})
              </div>
              <div className='text-sm text-[rgb(var(--muted-foreground))]'>
                Manage your vendor bookings and services
              </div>
            </div>
            
            <button className='inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] h-9 px-5 hover:scale-105 active:scale-95 cursor-pointer' onClick={() => navigate("/vendors")}>
              Browse Vendors
            </button>
          </div>
        </div>
        <div className='p-6 pt-0'>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-[rgba(var(--primary),0.1)] rounded-lg">
              <div className="text-2xl font-bold text-[rgb(var(--primary))]">{bookings.length}</div>
              <div className="text-sm text-[rgb(var(--muted-foreground))]">Total Bookings</div>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{confirmedBookings}</div>
              <div className="text-sm text-[rgb(var(--muted-foreground))]">Confirmed</div>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">${totalAmount.toLocaleString()}</div>
              <div className="text-sm text-[rgb(var(--muted-foreground))]">Total Amount</div>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4" />
              <p className="text-[rgb(var(--muted-foreground))]">No vendor bookings yet.</p>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">Browse vendors to find services for your event.</p>
              <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 mt-4" onClick={() => navigate("/vendors")} >
                Browse Vendors
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--muted-foreground))] shadow-sm border-l-4 border-l-[rgb(var(--primary))]">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg mb-1">
                          {booking.vendor.business_name}
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]">
                            {booking.vendor.category}
                          </div>
                          <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all ${booking.status.toLowerCase() === 'confirmed' ? 'border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]' : booking.status.toLowerCase() === 'pending' ? 'border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]' : booking.status.toLowerCase() === 'cancelled' ? 'border-transparent bg-[rgb(var(--destructive))] text-[rgb(var(--destructive-foreground))] hover:bg-[rgba(var(--destructive),0.8)]' : booking.status.toLowerCase() === 'completed' ? 'border-transparent bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] hover:bg-[rgba(var(--primary),0.8)]' : 'border-transparent bg-[rgb(var(--secondary))] text-[rgb(var(--secondary-foreground))] hover:bg-[rgba(var(--secondary),0.8)]' }`} >
                            {booking.status}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-[rgb(var(--primary))]">
                          ${booking.total_amount?.toLocaleString() || "TBD"}
                        </div>
                        <div className="text-sm text-[rgb(var(--muted-foreground))]">
                          {new Date(booking.booking_date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {booking.service_description && (
                      <div className="mb-4">
                        <h5 className="font-medium mb-1">Service Description</h5>
                        <p className="text-[rgb(var(--muted-foreground))] text-sm">
                          {booking.service_description}
                        </p>
                      </div>
                    )}

                    {booking.notes && (
                      <div className="mb-4">
                        <h5 className="font-medium mb-1">Notes</h5>
                        <p className="text-[rgb(var(--muted-foreground))] text-sm">
                          {booking.notes}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-[rgb(var(--muted-foreground))]">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {booking.vendor.location}
                        </div>
                        
                        {booking.vendor.contact_email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {booking.vendor.contact_email}
                          </div>
                        )}
                        
                        {booking.vendor.contact_phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {booking.vendor.contact_phone}
                          </div>
                        )}
                      </div>
                      
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-9 px-4 py-2 cursor-pointer"  onClick={() => navigate(`/vendors/${booking.vendor.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Vendor
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingsList