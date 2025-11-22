import userModel from "../models/userModel.js";

// Get current user's profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // from middleware

    const user = await userModel.findById(userId).select("-password -resetOtp -resetOtpExpireAt");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server error" });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, bio, location, is_vendor } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, phone, bio, location, is_vendor },
      { new: true, runValidators: true }).select("-password");

    res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
