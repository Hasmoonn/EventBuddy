import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema({
  name: {type: String, trim: true, required: true},
  email: {type: String, required: true, unique: true, trim: true, lowercase: true, validate: [validator.isEmail, 'Please provide a valid email']},
  password: {type: String, required: true},
  phone: {type: String},
  bio: { type: String, default: '' },
  location: { type: String },
  avatar_url: { type: String, default: '' },
  is_vendor: { type: Boolean, default: false },
  is_active: { type: Boolean, default: true },
  resetOtp: {type: String, default: ''},
  resetOtpExpireAt: {type: Number, default: 0},
}, { timestamps: true });

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;