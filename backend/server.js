import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from "./config/mongodb.js"
import connectCloudinary from './config/cloudinary.js'
import authRouter from './routes/authRoutes.js'


const app = express();
const port = 4000 || process.env.PORT;
connectDB();
connectCloudinary();


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


app.get('/', (req, res) => {
  res.send("Welcome to my backend")
})

app.use('/api/auth', authRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});