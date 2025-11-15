import eventModel from '../models/eventModel.js';
import bookingModel from '../models/bookingModel.js';
import vendorModel from '../models/vendorModel.js';
import userModel from '../models/userModel.js';

// Get user analytics
export const getUserAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Total events created by user
    const totalEvents = await eventModel.countDocuments({ user_id: userId });

    // Events by status
    const eventsByStatus = await eventModel.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Total bookings made by user
    const totalBookings = await bookingModel.countDocuments({ user_id: userId });

    // Bookings by status
    const bookingsByStatus = await bookingModel.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Total revenue spent (sum of total_amount from confirmed bookings)
    const totalRevenue = await bookingModel.aggregate([
      { $match: { user_id: userId, status: 'Confirmed' } },
      { $group: { _id: null, total: { $sum: '$total_amount' } } }
    ]);

    // Recent events (last 5)
    const recentEvents = await eventModel.find({ user_id: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title event_date status');

    // Monthly event creation trend (last 12 months)
    const monthlyEvents = await eventModel.aggregate([
      { $match: { user_id: userId, createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Average budget per event
    const avgBudget = await eventModel.aggregate([
      { $match: { user_id: userId, budget: { $exists: true, $ne: null } } },
      { $group: { _id: null, avg: { $avg: '$budget' } } }
    ]);

    // Top event types
    const eventTypes = await eventModel.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: '$event_type', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Upcoming events
    const upcomingEvents = await eventModel.countDocuments({
      user_id: userId,
      event_date: { $gte: new Date() },
      status: { $in: ['draft', 'planning', 'confirmed'] }
    });

    const analytics = {
      totalEvents,
      eventsByStatus,
      totalBookings,
      bookingsByStatus,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      recentEvents,
      monthlyEvents,
      avgBudget: avgBudget.length > 0 ? avgBudget[0].avg : 0,
      eventTypes,
      upcomingEvents
    };

    res.json({ success: true, analytics });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get vendor analytics (if user is a vendor)
export const getVendorAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if user is a vendor
    const vendor = await vendorModel.findOne({ user_id: userId });
    if (!vendor) {
      return res.json({ success: false, message: 'User is not a vendor' });
    }

    // Total bookings received
    const totalBookings = await bookingModel.countDocuments({ vendor_id: vendor._id });

    // Bookings by status
    const bookingsByStatus = await bookingModel.aggregate([
      { $match: { vendor_id: vendor._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Total revenue earned
    const totalRevenue = await bookingModel.aggregate([
      { $match: { vendor_id: vendor._id, status: 'Confirmed' } },
      { $group: { _id: null, total: { $sum: '$total_amount' } } }
    ]);

    // Recent bookings
    const recentBookings = await bookingModel.find({ vendor_id: vendor._id })
      .populate('user_id', 'name')
      .populate('event_id', 'title')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('booking_date total_amount status');

    // Monthly booking trend
    const monthlyBookings = await bookingModel.aggregate([
      { $match: { vendor_id: vendor._id, createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const analytics = {
      totalBookings,
      bookingsByStatus,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      recentBookings,
      monthlyBookings,
      vendorInfo: {
        business_name: vendor.business_name,
        category: vendor.category,
        rating: vendor.rating,
        total_reviews: vendor.total_reviews
      }
    };

    res.json({ success: true, analytics });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
