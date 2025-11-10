import userModel from "../models/userModel.js";
import vendorModel from "../models/vendorModel.js";
import eventModel from "../models/eventModel.js";
import bookingModel from "../models/bookingModel.js";
import reviewModel from "../models/reviewModel.js";

// Get admin dashboard stats
export const getAdminStats = async (req, res) => {
  try {
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const totalUsers = await userModel.countDocuments();
    const totalVendors = await vendorModel.countDocuments();
    const totalEvents = await eventModel.countDocuments();

    // Calculate total revenue from bookings
    const bookings = await bookingModel.find({ status: 'Confirmed' });
    const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.total_amount || 0), 0);

    // Recent bookings (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentBookings = await bookingModel.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
      status: 'Confirmed'
    });

    // Active events (upcoming events)
    const activeEvents = await eventModel.countDocuments({
      event_date: { $gte: new Date() },
      status: { $in: ['planning', 'confirmed'] }
    });

    // Growth rates
    const currentMonthUsers = await userModel.countDocuments({ createdAt: { $gte: oneMonthAgo } });
    const previousMonthUsers = await userModel.countDocuments({ createdAt: { $gte: twoMonthsAgo, $lt: oneMonthAgo } });
    const totalUsersGrowth = previousMonthUsers > 0 ? ((currentMonthUsers - previousMonthUsers) / previousMonthUsers * 100).toFixed(1) : 0;

    const currentMonthVendors = await vendorModel.countDocuments({ createdAt: { $gte: oneMonthAgo } });
    const previousMonthVendors = await vendorModel.countDocuments({ createdAt: { $gte: twoMonthsAgo, $lt: oneMonthAgo } });
    const totalVendorsGrowth = previousMonthVendors > 0 ? ((currentMonthVendors - previousMonthVendors) / previousMonthVendors * 100).toFixed(1) : 0;

    const currentMonthEvents = await eventModel.countDocuments({ createdAt: { $gte: oneMonthAgo } });
    const previousMonthEvents = await eventModel.countDocuments({ createdAt: { $gte: twoMonthsAgo, $lt: oneMonthAgo } });
    const totalEventsGrowth = previousMonthEvents > 0 ? ((currentMonthEvents - previousMonthEvents) / previousMonthEvents * 100).toFixed(1) : 0;

    const currentMonthRevenue = bookings.filter(b => b.createdAt >= oneMonthAgo).reduce((sum, b) => sum + (b.total_amount || 0), 0);
    const previousMonthRevenue = bookings.filter(b => b.createdAt >= twoMonthsAgo && b.createdAt < oneMonthAgo).reduce((sum, b) => sum + (b.total_amount || 0), 0);
    const totalRevenueGrowth = previousMonthRevenue > 0 ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1) : 0;

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalVendors,
        totalEvents,
        totalRevenue,
        recentBookings,
        activeEvents,
        totalUsersGrowth: parseFloat(totalUsersGrowth),
        totalVendorsGrowth: parseFloat(totalVendorsGrowth),
        totalEventsGrowth: parseFloat(totalEventsGrowth),
        totalRevenueGrowth: parseFloat(totalRevenueGrowth)
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all users for admin
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, {
      password: 0,
      resetOtp: 0,
      resetOtpExpireAt: 0
    }).sort({ createdAt: -1 });

    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get all vendors for admin
export const getVendors = async (req, res) => {
  try {
    const vendors = await vendorModel.find()
      .populate('user_id', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, vendors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Toggle user status (activate/deactivate)
export const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Add is_active field if it doesn't exist
    if (user.is_active === undefined) {
      user.is_active = true;
    }

    user.is_active = !user.is_active;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.is_active ? 'activated' : 'deactivated'} successfully`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        is_active: user.is_active
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Toggle vendor verification
export const toggleVendorVerification = async (req, res) => {
  try {
    const { vendorId } = req.body;

    const vendor = await vendorModel.findById(vendorId);
    if (!vendor) {
      return res.json({ success: false, message: "Vendor not found" });
    }

    vendor.verified = !vendor.verified;
    await vendor.save();

    res.json({
      success: true,
      message: `Vendor ${vendor.verified ? 'verified' : 'unverified'} successfully`,
      vendor: {
        _id: vendor._id,
        business_name: vendor.business_name,
        verified: vendor.verified
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get admin analytics data
export const getAdminAnalytics = async (req, res) => {
  try {
    const now = new Date();
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // User growth rate (current month vs previous month)
    const currentMonthUsers = await userModel.countDocuments({
      createdAt: { $gte: oneMonthAgo }
    });
    const previousMonthUsers = await userModel.countDocuments({
      createdAt: { $gte: twoMonthsAgo, $lt: oneMonthAgo }
    });
    const userGrowthRate = previousMonthUsers > 0 ? ((currentMonthUsers - previousMonthUsers) / previousMonthUsers * 100).toFixed(1) : 0;

    // Vendor conversion rate (vendors / total users)
    const totalUsers = await userModel.countDocuments();
    const totalVendors = await vendorModel.countDocuments();
    const vendorConversionRate = totalUsers > 0 ? (totalVendors / totalUsers * 100).toFixed(1) : 0;

    // Average event value
    const confirmedBookings = await bookingModel.find({ status: 'Confirmed' });
    const totalRevenue = confirmedBookings.reduce((sum, booking) => sum + (booking.total_amount || 0), 0);
    const totalBookings = confirmedBookings.length;
    const averageEventValue = totalBookings > 0 ? (totalRevenue / totalBookings).toFixed(0) : 0;

    // Customer satisfaction (average rating from reviews)
    const reviews = await reviewModel.find({});
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const totalReviews = reviews.length;
    const customerSatisfaction = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;

    // Popular event types (from events)
    const totalEvents = await eventModel.countDocuments();
    const eventTypes = await eventModel.aggregate([
      { $group: { _id: "$event_type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 4 }
    ]);

    res.json({
      success: true,
      analytics: {
        userGrowthRate: parseFloat(userGrowthRate),
        vendorConversionRate: parseFloat(vendorConversionRate),
        averageEventValue: parseInt(averageEventValue),
        customerSatisfaction: parseFloat(customerSatisfaction),
        popularEventTypes: eventTypes.map(type => ({
          name: type._id,
          percentage: totalEvents > 0 ? Math.round((type.count / totalEvents) * 100) : 0
        }))
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
