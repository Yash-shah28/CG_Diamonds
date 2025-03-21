import  { config } from 'dotenv';
config()
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.routes.js'
import diamondRoutes from './routes/Diamonds.routes.js'

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || 'mysupersecretcode',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        expries: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}));

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','Cache-Control']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use((req,res,next) =>{
    res.locals.currentUser = req.user;
    next();
})

app.use('/sellers', diamondRoutes);
app.use('/sellers', sellerRoutes);
app.use('/users', userRoutes);

app.get('/',(req,res)=>{
    res.send("Working")
})


export default app

