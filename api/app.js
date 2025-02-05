import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors' 

//configure env
dotenv.config()

connectDB();

//rest object
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/products',productRoutes)

//rest api
app.get('/',(req,res)=>{
    res.send({
        message: "welcome"
    })

})

//
const PORT= process.env.PORT

//run(listen)
app.listen(PORT,()=>{
    console.log(`server is running at PORT : ${PORT}`);
})