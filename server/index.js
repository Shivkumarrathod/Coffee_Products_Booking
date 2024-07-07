import express from 'express'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connectDb from './config/db.js'
import cors from 'cors'

//Routes
import userRouter from './routes/userRoutes.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/product.js'

dotenv.config()
const PORT = process.env.PORT || 7000
connectDb()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/api/users',userRouter)
app.use('/api/category',categoryRoute)
app.use('/api/product',productRoute)

app.listen(PORT,()=>console.log(`Server is connected at PORT ${PORT}`))