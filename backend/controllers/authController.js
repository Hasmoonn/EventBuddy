import transporter from "../config/nodemailer.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from 'validator'
import jwt from "jsonwebtoken"


// register(done)
export const registerUser = async (req, res) => {
  
  try {
    const {name, email, password, is_vendor} = req.body;

    if (!name || !email || !password) {
      return res.json({success: false, message: "Missing Details"})
    }

    // check user already exist or not
    const exists = await userModel.findOne({email})

    if (exists) {
      return res.json({success: false, message: "User already exists"})
    }

    // validate email format and strong password 
    if (!validator.isEmail(email)) {
      return res.json({success: false, message: "Please enter a valid email"})
    }

    if (password.length < 8) {
      return res.json({success: false, message: "Please enter a strong password"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt) 

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      is_vendor: is_vendor || false
    })

    const user = await newUser.save()

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d'})

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to EventBuddy",
      text: `Welcome to my website. Your account has been created with email id: ${email}, Thank you!`
    }

    await transporter.sendMail(mailOptions);

    res.json({ success: true, token, user: {
      name:user.name,
      email:user.email,
      is_vendor: user.is_vendor
    }})

  } catch (error) {
      console.log(error.message);
      res.json({success: false, message: error.message})
  }
}


// login(done)
export const loginUser = async (req, res) => {
  try {
    
    const { email, password } = req.body;

    if (password.length < 8) {
      return res.json({success:false, message: "Password length must be greater than 7 digits"})
    }

    const user = await userModel.findOne({email})

    if (!user) {
      return res.json({success: false, message: "user does not exist"})
    }   

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({success: false, message: 'invalid Credentials'})
    }
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 1 * 24 * 60 * 60 * 1000
    });

    res.json({success: true, token, user: {
      name: user.name,
      email: user.email,
    }});

  } catch (error) {
      console.log(error.message);
      res.json({success: false, message: error.message})
  }
}


// Logout (success)
export const logout = async (req, res) => {

  try {

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })

    return res.json({success: true, message: "Logged out"})
    
  } catch (error) {
      console.log(error.message);
      res.json({success: false, message: error.message})
  }
}


// admin login 
export const adminLogin = async (req, res) => {

  try {
    
    const {email, password} = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email+password, process.env.JWT_SECRET)

      res.json({success: true, token})
    } else {
      res.json({success:false, message:"Invalid Credentials"})
    }
  } catch (error) {
      res.json({success: false, message: error.message})
  }
}


// check if user is authenticated (success)
export const isAuthenticated = async (req, res) => {

  try {
    const user = req.user;

    return res.json({ success: true, user: {
      name: user.name,
      email: user.email,
    }
   }) // changed
  } catch (error) {
      return res.json({success:false, message:error.message})
  }
}


// send password reset otp (success)
export const sendResetOtp = async (req, res) => {

  const { email } = req.body;

  if (!email) {
    return res.json({success:false, message: "Email is required"})
  }

  try {

    const user = await userModel.findOne({email})

    if (!user) {
      return res.json({success:false, message: "User not found"})
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000))

    user.resetOtp = otp;

    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password reset OTP",
      text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({success:true, message:"OTP sent to your email"})
    
  } catch (error) {
      res.json({success:false, message:error.message});
  }
}


//Reset user Password (success)
export const resetPassword = async (req, res) => {

  const {email, otp, newPassword} = req.body

  if (!email || !otp || !newPassword) {
    return res.json({success:false, message:"Email, Otp and New Password are required"})
  }

  if (newPassword.length < 8) {
    return res.json({success:false, message:"Password must be at least 8 characters"});
  }

  try {

    const user = await userModel.findOne({email})

    if (!user) {
      return res.json({success:false, message:"User not found"})
    }

    if (user.resetOtp === '' || user.resetOtp !== otp) {
      return res.json({success:false, message:"Invalid OTP"})
    }
    
    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({success:false, message:"OTP Expired"})
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    user.resetOtp = ''
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({success:true, message:"Password has been reset successfully"})

  } catch (error) {
    return res.json({success:false, message: error.message})
  }
}