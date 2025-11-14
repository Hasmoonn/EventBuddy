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