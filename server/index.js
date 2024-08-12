import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connectDb from './config/db.js'
import cors from 'cors'
import Razorpay from 'razorpay'
//Routes
import productRoute from './routes/productRoute.js'
import userRouter from './routes/userRoutes.js'
import categoryRoute from './routes/categoryRoute.js'
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js'

dotenv.config()
const PORT = process.env.PORT || 7000
connectDb()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

const razorpay = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET'
});
  
  app.post('/create-order', async (req, res) => {
    const { amount, currency } = req.body;
  
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: currency,
      receipt: 'order_rcptid_11'
    };
  
    try {
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      res.status(500).send(error);
    }
  });

app.use('/api/users',userRouter)
app.use('/api/category',categoryRoute)
app.use('/api/product',productRoute)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRoute)

app.listen(PORT,()=>console.log(`Server is connected at PORT ${PORT}`))