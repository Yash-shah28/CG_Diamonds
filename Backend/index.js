import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import { connectToDb } from './db/connectDb.js';
import sellerRoutes from './routes/seller.route.js';
import userRoutes from './routes/user.route.js';
import diamondRoutes from './routes/diamond.routes.js';
import cartRoutes from './routes/cart.route.js';
import whishlistRoutes from './routes/whishlist.route.js';
import orderRoutes from './routes/order.route.js';


dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;



app.use("/api/seller", sellerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/diamond',diamondRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/wishlist',whishlistRoutes);
app.use('/api/orders',orderRoutes);


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
    });
}

app.listen(PORT, () => {
    connectToDb();
    console.log('Server is running on port:', PORT);
});