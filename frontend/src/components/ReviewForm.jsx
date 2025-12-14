import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { X } from 'lucide-react';

const ReviewForm = ({ vendorId, review, onClose, onSuccess }) => {
  const { backendUrl, user } = useContext(AuthContext);

  const [userBookings, setUserBookings] = useState([]);
  const [reviewForm, setReviewForm] = useState({
    booking_id: review?.booking_id?._id || "",
    rating: review?.rating || "",
    comment: review?.comment || ""
  });
  const [loading, setLoading] = useState(false);

  const isEditing = !!review;

  const fetchUserBookings = async () => {
  if (!user) return;

  try {
    const response = await axios.get(`${backendUrl}/api/reviews/user-bookings`, {
      withCredentials: true,
    });

    if (response.data.success) {
      // Filter bookings for the current vendor only
      const vendorBookings = response.data.bookings.filter(
        booking => booking.vendor_id?._id === vendorId || booking.vendor_id === vendorId
      );
      setUserBookings(vendorBookings);
    } else {
      toast.error(response.data.message || 'Failed to fetch bookings');
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || 'Failed to fetch bookings');
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;

    setLoading(true);

    try {
      const url = isEditing
        ? `${backendUrl}/api/reviews/${review._id}`
        : `${backendUrl}/api/reviews/submit`;

      const method = isEditing ? 'put' : 'post';

      const response = await axios({
        method: method,
        url: url,
        data: {
          booking_id: reviewForm.booking_id,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
          userId: user._id
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(isEditing ? 'Review updated successfully!' : 'Review submitted successfully!');
        onSuccess();
        onClose();
      } else {
        toast.error(response.data.message || `Failed to ${isEditing ? 'update' : 'submit'} review`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || `Failed to ${isEditing ? 'update' : 'submit'} review`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      fetchUserBookings();
    }
  }, [user, isEditing, vendorId]); // Added vendorId here

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg max-h-[80vh] overflow-y-auto">
        {/* Close button */}
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 cursor-pointer">
          <X className="h-5 w-5" />
        </button>

        <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
          <h2 className="font-semibold leading-none tracking-tight mb-2 text-lg">
            {isEditing ? 'Edit Review' : 'Write a Review'}
          </h2>
          <p className="text-[rgb(var(--muted-foreground))] mb-4 text-sm">
            {isEditing ? 'Update your experience with this vendor' : 'Share your experience with this vendor'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isEditing && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Select Booking
              </label>
              <select
                className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
                value={reviewForm.booking_id}
                onChange={(e) => setReviewForm(prev => ({ ...prev, booking_id: e.target.value }))}
                required
              >
                <option value="">Choose a booking</option>
                {userBookings.map((booking) => (
                  <option key={booking._id} value={booking._id}>
                    {booking.event_id?.title} - {new Date(booking.booking_date).toLocaleDateString()}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Rating
            </label>
            <select
              className='flex h-10 w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              value={reviewForm.rating}
              onChange={(e) => setReviewForm(prev => ({ ...prev, rating: e.target.value }))}
              required
            >
              <option value="">Select rating</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} {rating === 1 ? 'Star' : 'Stars'}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Comment
            </label>
            <textarea
              className='flex w-full rounded-md border border-[rgb(var(--input))] bg-[rgb(var(--background))] px-3 py-2 text-base ring-offset-[rgb(var(--background))] placeholder:text-[rgb(var(--muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm'
              value={reviewForm.comment}
              onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Share your experience..."
              rows={4}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-[rgb(var(--background))] transition-all duration-300 flex-1 cursor-pointer bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--primary-glow))] text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-glow))] active:scale-95 h-11 py-3 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : (isEditing ? 'Update Review' : 'Submit Review')}
            </button>

            <button
              type="button"
              className='inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-[rgb(var(--background))] transition-all duration-300 border-2 border-[rgb(var(--primary))] text-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-[rgb(var(--primary-foreground))] hover:shadow-[rgb(var(--shadow-soft))] hover:scale-105 active:scale-95 h-11 px-6 py-3 cursor-pointer'
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
