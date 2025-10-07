import { MessageSquare, Star, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { booking, reviewsData } from '../assets/assets.js'

const ReviewList = ({ vendorId }) => {

  const [user, setUser] = useState(true)

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddReview, setShowAddReview] = useState(false);
  const [userBookings, setUserBookings] = useState([]);

  const [reviewForm, setReviewForm] = useState({
    booking_id: "",
    rating: "",
    comment: ""
  });

  const fetchReviews = async () => {
    setLoading(true)

    try {

      setReviews(reviewsData);
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    if (!user) 
      return;
    
    try {

      setUserBookings(booking);
    } catch (error) {
        toast.error(error.message)    
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) 
      return;
    
    try {
      

      // Reset form and close dialog
      setReviewForm({
        booking_id: "",
        rating: "",
        comment: ""
      });
      setShowAddReview(false);
      fetchReviews();
    } catch (error) {
        toast.error(error.message)
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;


  useEffect(() => {
    fetchReviews();

    if (user) {
      fetchUserBookings();
    }
  }, [vendorId, user]);

  if (loading) {
    return (
      <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
        <div className="p-6 pt-0 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[rgb(var(--primary))] mx-auto mb-4"></div>
          <p className="text-[rgb(var(--muted-foreground))]">Loading reviews...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="rounded-lg border bg-[rgb(var(--card))] text-[rgb(var(--card-foreground))] shadow-sm card-elegant">
      <div className='flex flex-col space-y-1.5 p-6'>
        <div className="flex items-center justify-between mb-6 border-b pb-2">
          <div>
            <div className="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[rgb(var(--primary))]" />
              Reviews ({reviews.length})
            </div>
            <div className='text-sm text-[rgb(var(--muted-foreground))]'>
              {reviews.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <span className="font-medium">{averageRating.toFixed(1)} out of 5</span>
                </div>
              )}
            </div>
          </div>
          
          {
            user && userBookings.length > 0 && (
              <button onClick={() => setShowAddReview(true)} className='inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-[rgb(var(--background))] transition-all duration-300 cursor-pointer bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-11 px-6 py-3'>
                <MessageSquare className="w-4 h-4 mr-2" />
                Write Review
              </button>
            )
          }
        </div>

        {
          showAddReview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
              <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                {/* Close button */}
                <button onClick={() => setShowAddReview(false)}  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 cursor-pointer" >
                  <X className="h-5 w-5" />
                </button>

                <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
                  <h2 className="font-semibold leading-none tracking-tight mb-2 text-lg">
                    Write a Review
                  </h2>
                  <p className="text-[rgb(var(--muted-foreground))] mb-4 text-sm">
                    Share your experience with this vendor
                  </p>
                </div>

                
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Select Booking
                    </label>

                    <select className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' value={reviewForm.booking_id} onChange={(e) => setReviewForm(prev => ({ ...prev, booking_id: e.target.value }))} required placeholder="Choose a booking" >
                      {userBookings.map((booking, index) => (
                        <option key={index} value={booking.id}>
                          {booking.events?.title} - {new Date(booking.booking_date).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Rating
                    </label>

                    <select className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' value={reviewForm.rating} onChange={(e) => setReviewForm(prev => ({ ...prev, rating: e.target.value }))} required >
                      {[5, 4, 3, 2, 1].map((rating, index) => (
                        <option key={index} value={rating.toString()}>
                          <div className="flex items-center gap-2">
                            <span>{rating}</span>
                            <div className="flex">
                              {renderStars(rating)}
                            </div>
                          </div>
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Comment
                    </label>

                    <textarea className='flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm' value={reviewForm.comment} onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))} placeholder="Share your experience..." rows={4} required />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <button type="submit" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-[rgb(var(--background))] transition-all duration-300 flex-1 cursor-pointer bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] active:scale-95 h-11 py-3">
                      Submit Review
                    </button>

                    <button type="button" className='inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-[rgb(var(--background))] transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 px-6 py-3 cursor-pointer' onClick={() => setShowAddReview(false)} >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )
        }


        <div className='p-6 pt-0'>
          {
            reviews.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4" />

                <p className="text-[rgb(var(--muted-foreground))]">
                  No reviews yet.
                </p>

                <p className="text-sm text-[rgb(var(--muted-foreground))]">
                  Be the first to share your experience!
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {
                  reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-4">
                        <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                          <img src={review.profiles?.avatar_url} className='aspect-square h-full w-full' />

                          <div className="flex h-full w-full items-center justify-center rounded-full bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]">
                            {review.profiles?.full_name?.charAt(0) || "U"}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium">
                              {review.profiles?.full_name || "Anonymous"}
                            </h4>

                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>

                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all text-[rgb(var(--foreground))]">
                              {new Date(review.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <p className="text-[rgb(var(--muted-foreground))]">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ReviewList