import { MessageSquare, Star, Edit, Trash2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext.jsx';
import ReviewForm from './ReviewForm.jsx';

const ReviewList = ({ vendorId, onShowReviewForm, onEditReview }) => {
  const { backendUrl, user } = useContext(AuthContext)
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userBookings, setUserBookings] = useState([]);

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const {data} = await axios.get(`${backendUrl}/api/reviews/vendor/${vendorId}`);
      
      if (data.success) {
        setReviews(data.reviews || []);
      } else {
        toast.error(data.message || 'Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async () => {
    if (!user) return;

    try {
      const response = await axios.get(`${backendUrl}/api/reviews/user-bookings`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setUserBookings(response.data.bookings || []);
      } else {
        toast.error(response.data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to fetch bookings');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/reviews/${reviewId}`, {
        data: { userId: user._id },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success('Review deleted successfully!');
        fetchReviews();
      } else {
        toast.error(response.data.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to delete review');
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

  // Safe user ID comparison function
  const isUserReview = (review) => {
    if (!user || !review.user_id) 
      return false;
    
    // Handle both populated user object and string user_id
    const reviewUserId = review.user_id._id || review.user_id;
    return reviewUserId.toString() === user._id.toString();
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
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
          
          {user && userBookings.length > 0 && (
            <button
              onClick={() => onShowReviewForm && onShowReviewForm()}
              className='inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-[rgb(var(--background))] transition-all duration-300 cursor-pointer bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] hover:scale-105 active:scale-95 h-11 px-6 py-3'
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Write Review
            </button>
          )}
        </div>



        <div className='p-6 pt-0'>
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-[rgb(var(--muted-foreground))] mx-auto mb-4" />
              <p className="text-[rgb(var(--muted-foreground))]">No reviews yet.</p>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b last:border-b-0 pb-6 last:pb-0">
                  <div className="flex items-start gap-4">
                    {/* Avatar display */}
                    <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      {review.user_id?.avatar_url ? (
                        <img 
                          src={review.user_id.avatar_url} 
                          alt="User avatar" 
                          className='aspect-square h-full w-full object-cover'
                          onError={(e) => {
                            // If image fails to load, show fallback
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`flex h-full w-full items-center justify-center rounded-full bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] ${review.user_id?.avatar_url ? 'hidden' : 'flex'}`}>
                        {(review.user_id?.name?.charAt(0) || "U").toUpperCase()}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h4 className="font-medium">
                          {review.user_id?.name || "Anonymous"}
                        </h4>

                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>

                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all text-[rgb(var(--foreground))]">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </div>

                        {/* Edit/Delete buttons - only show for user's own reviews */}
                        {user && isUserReview(review) && (
                          <div className="flex items-center gap-2 ml-auto">
                            <button
                              onClick={() => onEditReview && onEditReview(review)}
                              className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer p-1 hover:bg-[rgb(var(--accent))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
                              title="Edit review"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this review?')) {
                                  handleDeleteReview(review._id);
                                }
                              }}
                              className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer p-1 hover:bg-red-100 text-red-600 hover:text-red-700"
                              title="Delete review"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      <p className="text-[rgb(var(--muted-foreground))] whitespace-pre-wrap">
                        {review.comment}
                      </p>
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

export default ReviewList;