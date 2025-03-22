import express from 'express'
import { body } from 'express-validator';
const router = express.Router();
import { loginSeller, registerSeller, checkSellerSession, logoutSeller, verifyToken,profileSeller } from "../controllers/seller.controllers.js";


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .withMessage('Password must contain uppercase, lowercase and numbers')],loginSeller);

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 Character long'),
    body('password')
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .withMessage('Password must contain uppercase, lowercase and numbers'),
    body('pnumber').isLength({ min: 10},{max: 15 })
    .matches(/^[0-9]+$/ )
    .withMessage("Phone number must be 10 digits long")
] ,registerSeller);

// Protected routes

router.post('/logout', checkSellerSession, logoutSeller);

router.get('/verify-token', verifyToken);

router.get('/profile', checkSellerSession, profileSeller.getProfile);
router.put('/profile', checkSellerSession, profileSeller.updateProfile);
router.put('/password', checkSellerSession, profileSeller.updatePassword);


export default router;