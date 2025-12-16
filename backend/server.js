import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from "./config/mongodb.js"
import connectCloudinary from './config/cloudinary.js'
import authRouter from './routes/authRoutes.js'
import vendorRouter from './routes/vendorRoutes.js'
import profileRouter from './routes/profileRoutes.js'
import eventRouter from './routes/eventRoutes.js'
import bookingRoutes from "./routes/bookingRoutes.js";
import guestRouter from "./routes/guestRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import analyticsRouter from "./routes/analyticsRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import chatRouter from "./routes/chatRoutes.js";


const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.get('/', (req, res) => {
  res.send("Welcome to my backend")
})

app.use('/api/auth', authRouter);
app.use('/api/vendors', vendorRouter);
app.use("/api/profile", profileRouter);
app.use("/api/bookings", bookingRoutes);
app.use("/api/events", eventRouter);
app.use("/api/guests", guestRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/admin", adminRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/chat", chatRouter);
// Removed redundant app.use for chatRoutes


app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
