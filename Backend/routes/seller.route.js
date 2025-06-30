import express from 'express';
import { login, logout, register,verifyEmail, forgotPassword, resetPassword, checkSellerAuth, updateSeller, updatePassword } from '../controllers/seller.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/check-auth',verifyToken, checkSellerAuth);
router.put('/update',verifyToken,updateSeller);
router.patch('/change-password',verifyToken,updatePassword);
router.post('/login',login);
router.post('/register',register);
router.post('/logout',logout);

router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);


export default router;