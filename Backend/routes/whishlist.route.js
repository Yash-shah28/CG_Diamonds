import express from 'express';
import {verifyToken} from '../middleware/verifyToken.js' 
import { addwhishlist,deletewishlist,getwhishlist } from '../controllers/whishlist.controller.js';

const router = express.Router();

router.post('/add',verifyToken,addwhishlist);
router.delete('/remove/:id',verifyToken,deletewishlist);
router.get('/',verifyToken, getwhishlist);

export default router