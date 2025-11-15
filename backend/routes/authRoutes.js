import express from 'express'
import { adminLogin, isAuthenticated, loginUser, logout, registerUser, resetPassword, sendResetOtp } from '../controllers/authController.js';
import {userAuth} from "../middleware/userAuth.js"

const authRouter = express.Router();


authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logout);

authRouter.post('/admin', adminLogin)

authRouter.get('/is-auth', userAuth, isAuthenticated);

authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);


export default authRouter;