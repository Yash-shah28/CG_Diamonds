import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { login, logout, register,verifyEmail,checkAuth, forgotPassword, resetPassword } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/check-auth',verifyToken,checkAuth);
router.post('/login',login);
router.post('/register',register);
router.post('/logout',logout);

router.post('/verify-email',verifyEmail);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword)


export default router;