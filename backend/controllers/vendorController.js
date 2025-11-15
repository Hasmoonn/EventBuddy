import {v2 as cloudinary} from 'cloudinary'
import bookingModel from "../models/bookingModel.js";
import reviewModel from "../models/reviewModel.js";
import userModel from "../models/userModel.js";
import vendorModel from "../models/vendorModel.js";


export const getAllVendors = async (req, res) => {
  try {
    const vendors = await vendorModel.find().populate("user_id", "name email");

    if (!vendors) {
      return res.json({ success: false, message: "There are no vendors!"})
    }

    res.json({ success: true, vendors });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
};


export const getVendorById = async (req, res) => {
  try {
    const { id } = req.params;
    const vendor = await vendorModel.findById(id).populate("user_id", "name email");

    if (!vendor) {
      return res.json({ success: false, message: "Vendor not found" });
    }

    res.json({ success: true, vendor });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Create vendor profile
export const createVendor = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      business_name,
      category,
      description,
      location,
      price_range_min,
      price_range_max,
      contact_email,
      contact_phone,
      services,
    } = req.body;

    // Check if vendor profile already exists for this user
    const existingVendor = await vendorModel.findOne({ user_id: userId });

    if (existingVendor) {
      return res.json({ success: false, message: 'Vendor profile already exists for this user'});
    }

    // Create vendor profile
    const vendor = new vendorModel({
      user_id: userId,
      business_name,
      category,
      description,
      location,
      price_range_min: price_range_min || undefined,
      price_range_max: price_range_max || undefined,
      contact_email: contact_email || req.user.email,
      contact_phone,
      services: services || [],
      image: "", // Will be set via separate upload
      portfolio_images: [] // Will be set via separate upload
    });

    await vendor.save();

    // Ensure user.is_vendor is true
    await userModel.findByIdAndUpdate(userId, { is_vendor: true });

    res.json({ success: true, message: 'Vendor profile created successfully', vendor: {
        id: vendor._id,
        business_name: vendor.business_name,
        category: vendor.category,
        description: vendor.description,
        location: vendor.location,
        contact_email: vendor.contact_email,
        contact_phone: vendor.contact_phone,
        services: vendor.services
      }  
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Get vendor dashboard data
export const getVendorDashboard = async (req, res) => {
  try {
    const vendorId = req.user.id; // Assuming vendor ID is stored in req.user

    // Get vendor profile
    const vendor = await vendorModel.findOne({ user_id: vendorId });

    if (!vendor) {
      return res.json({ success: false, message: 'Vendor profile not found' });
    }

    // Get bookings
    const bookings = await bookingModel.find({ vendor_id: vendor._id })
      .populate('user_id', 'name email')
      .populate('event_id', 'title event_type')
      .sort({ createdAt: -1 });

    // Get reviews
    const reviews = await reviewModel.find({ vendor_id: vendor._id })
      .populate('user_id', 'name')
      .sort({ createdAt: -1 });

    // Calculate analytics
    const totalRevenue = bookings.reduce((sum, booking) =>
      sum + (booking.status === 'Confirmed' ? Number(booking.total_amount) || 0 : 0), 0);

    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
    const totalBookings = bookings.length;
    const bookingConversionRate = totalBookings > 0 ? Math.round((confirmedBookings / totalBookings) * 100) : 0;

    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    // Calculate monthly metrics (current month)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt);
      return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
    }).length;

    const monthlyRevenue = bookings.filter(booking => {
      const bookingDate = new Date(booking.createdAt);
      return bookingDate.getMonth() === currentMonth &&
             bookingDate.getFullYear() === currentYear &&
             booking.status === 'Confirmed';
    }).reduce((sum, booking) => sum + (Number(booking.total_amount) || 0), 0);

    // Calculate repeat customer rate (users with multiple bookings)
    const userBookingCounts = {};
    bookings.forEach(booking => {
      const userId = booking.user_id._id.toString();
      userBookingCounts[userId] = (userBookingCounts[userId] || 0) + 1;
    });
    const repeatCustomers = Object.values(userBookingCounts).filter(count => count > 1).length;
    const uniqueCustomers = Object.keys(userBookingCounts).length;
    const repeatCustomerRate = uniqueCustomers > 0 ? Math.round((repeatCustomers / uniqueCustomers) * 100) : 0;

    const analytics = {
      totalBookings: confirmedBookings,
      totalRevenue,
      averageRating: Math.round(avgRating * 10) / 10,
      responseRate: 95, // This could be calculated based on actual response times
      bookingConversionRate,
      monthlyBookings,
      monthlyRevenue,
      repeatCustomerRate,
      totalReviews: reviews.length
    };

    res.json({success: true,
      vendorProfile: vendor,
      bookings,
      reviews,
      analytics
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Update vendor profile
export const updateVendorProfile = async (req, res) => {
  try {
    const vendorId = req.user.id;

    const {
      business_name,
      description,
      services,
      contact_email,
      contact_phone,
      price_range_min,
      price_range_max,
      location
    } = req.body;

    const vendor = await vendorModel.findOne({ user_id: vendorId });

    if (!vendor) {
      return res.json({ success: false, message: 'Vendor profile not found' });
    }

    const updatedVendor = await vendorModel.findByIdAndUpdate(
      vendor._id,
      {
        business_name,
        description,
        services,
        contact_email,
        contact_phone,
        price_range_min: price_range_min ? Number(price_range_min) : null,
        price_range_max: price_range_max ? Number(price_range_max) : null,
        location
      },
      { new: true, runValidators: true }
    );

    res.json({ success: true, message: 'Profile updated successfully', vendor: updatedVendor });
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
};


export const uploadVendorImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "No image file provided"
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'vendor-profiles'
    });

    // Update vendor with new image URL
    const vendor = await vendorModel.findOneAndUpdate(
      { user_id: req.user.id },
      { $set: { image: result.secure_url } },
      { new: true }
    ).select('image business_name');

    res.json({ success: true, message: "Profile image uploaded successfully", data: {
        image: vendor.image,
        business_name: vendor.business_name
      }
    });

  } catch (error) {
    console.error("Upload vendor image error:", error);
    res.json({success: false, message: error.message});
  }
}


// Upload Portfolio Images
export const uploadPortfolioImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.json({
        success: false,
        message: "No portfolio images provided"
      });
    }

    const uploadPromises = req.files.map(file => 
      cloudinary.uploader.upload(file.path, {
        folder: 'vendor-portfolio'
      })
    );

    const results = await Promise.all(uploadPromises);
    const portfolioUrls = results.map(result => result.secure_url);

    // Add new portfolio images to vendor
    const vendor = await vendorModel.findOneAndUpdate(
      { user_id: req.user.id },
      { $push: { portfolio_images: { $each: portfolioUrls } } },
      { new: true }
    ).select('portfolio_images business_name');

    res.json({
      success: true,
      message: "Portfolio images uploaded successfully",
      data: {
        portfolio_images: vendor.portfolio_images,
        business_name: vendor.business_name,
        uploaded_count: portfolioUrls.length
      }
    });

  } catch (error) {
    console.error("Upload portfolio images error:", error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


// Remove Portfolio Image
export const removePortfolioImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.json({
        success: false,
        message: "Image URL is required"
      });
    }

    // Remove from vendor's portfolio_images array
    const vendor = await vendorModel.findOneAndUpdate(
      { user_id: req.user.id },
      { $pull: { portfolio_images: imageUrl } },
      { new: true }
    ).select('portfolio_images business_name');

    // Optional: Delete from Cloudinary
    // Extract public_id from URL and delete from Cloudinary
    const publicId = imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`vendor-portfolio/${publicId}`);

    res.json({
      success: true,
      message: "Portfolio image removed successfully",
      data: {
        portfolio_images: vendor.portfolio_images,
        business_name: vendor.business_name
      }
    });

  } catch (error) {
    console.error("Remove portfolio image error:", error);
    res.json({
      success: false,
      message: error.message
    });
  }
};


