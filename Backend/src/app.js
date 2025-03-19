import  { config } from 'dotenv';
config()
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.routes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/users',userRoutes)
app.use('/sellers',sellerRoutes)

app.get('/',(req,res)=>{
    res.send("Working")
})


export default app
