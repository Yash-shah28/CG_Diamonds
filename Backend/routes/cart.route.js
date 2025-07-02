import express from 'express';
import { addToCart, removeFromCart, updateQuantity, getCart } from '../controllers/cart.controller.js';
import {verifyToken} from '../middleware/verifyToken.js' 

const router = express.Router();

router.post('/add',verifyToken,addToCart);
router.delete('/remove/:id',verifyToken,removeFromCart);
router.put('/update/:id',verifyToken, updateQuantity);
router.get('/',verifyToken, getCart);

export default router