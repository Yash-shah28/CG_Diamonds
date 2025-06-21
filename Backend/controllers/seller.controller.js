import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

import { Seller } from '../models/seller.model.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
// import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mailtrap/emails.js';

export const register = async(req, res) => {

    const { firstname, lastname, email, password, pnumber, company, address} = req.body;
    try {
        if (!firstname || !email || !password || !pnumber || !company || !address) {
            throw new Error('All fields are required');
        }

        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({success:false, message: 'Seller with this email already exists' });
        }

        const existingSellerByPhone = await Seller.findOne({ pnumber });
        if (existingSellerByPhone) {
            return res.status(400).json({success:false, message: 'Seller with this phone number already exists' });
        }

        const hasedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); 

        const seller = new Seller({
            firstname,
            lastname,
            email,
            password: hasedPassword,
            pnumber,
            company,
            address,
            verificationToken: verificationToken,
            verificationExpires: Date.now() + 24 * 60 * 60 * 1000 
        });

        await seller.save();

        // generateTokenAndSetCookie(res, seller._id);

        // await sendVerificationEmail(seller.email, verificationToken);

        return res.status(201).json({
            success:true, 
            message: 'Seller registered successfully', 
            seller: {
                firstname: seller.firstname,
                lastname: seller.lastname,
                email: seller.email,
                pnumber: seller.pnumber,
                company: seller.company,
                address: seller.address,
                isVerified: seller.isVerified
            } 
        });
        
    } catch (error) {
        return res.status(400).json({success:false, message: error.message });
    }
}

export const verifyEmail = async(req, res) => {
    const {code} = req.body;

    try{
        const seller = await Seller.findOne({
            verificationToken: code,
            verificationExpires: { $gt: Date.now() }
        });
        if (!seller) {
            return res.status(400).json({success:false, message: 'Invalid or expired verification code' });
        };

        seller.isVerified = true;
        seller.verificationToken = undefined;
        seller.verificationExpires = undefined;
        await seller.save();

        // await sendWelcomeEmail(seller.email, seller.firstname);
        return res.status(200).json({
            success:true, 
            message: 'Email verified successfully',
            seller: {
                firstname: seller.firstname,
                lastname: seller.lastname,
                email: seller.email,
                pnumber: seller.pnumber,
                company: seller.company,
                address: seller.address,
                isVerified: seller.isVerified
            } 
         });
    } catch (error) {
        return res.status(400).json({success:false, message: error.message });

    }
}

export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const seller = await Seller.findOne({ email });
        if(!seller) {
            return res.status(400).json({success:false, message: 'Invalid credentials' });
        }
        if (!seller.isVerified) {
            return res.status(400).json({success:false, message: 'Please verify your email before logging in' });
        }
        const isPasswordValid = await bcryptjs.compare(password,seller.password);
        if (!isPasswordValid) {
            return res.status(400).json({success:false, message: 'Invalid credentials' });
        }
        generateTokenAndSetCookie(res, seller._id);
        seller.lastLogin = new Date();
        await seller.save();
        return res.status(200).json({
            success:true, 
            message: 'Login successful', 
            seller: {
                firstname: seller.firstname,
                lastname: seller.lastname,
                email: seller.email,
                pnumber: seller.pnumber,
                company: seller.company,
                address: seller.address,
                isVerified: seller.isVerified
            } 
        });

    } catch (error) {
        return res.status(400).json({success:false, message: error.message });
    }
}

export const logout = async(req, res) => {
    res.clearCookie('token');
    return res.status(200).json({success:true, message: 'Logged out successfully'});

}

export const forgotPassword = async(req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            throw new Error('Email is required');
        }

        const seller = await Seller.findOne({ email });
        if (!seller) {
            return res.status(400).json({success:false, message: 'Seller with this email does not exist' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        seller.resetPasswordToken = resetToken;
        seller.resetPasswordExpires = resetPasswordExpires;
        await seller.save();

        // await sendPasswordResetEmail(seller.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        return res.status(200).json({success:true, message: 'Password reset link sent to your mail' });


    } catch (error) {
        return res.status(400).json({success:false, message: error.message });
    }

}   

export const resetPassword = async(req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        
        const seller = await Seller.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!seller) {
            return res.status(400).json({success:false, message: 'Invalid or expired password reset token' });
        }

        const hasedPassword = await bcryptjs.hash(password, 10);
        seller.password = hasedPassword;
        seller.resetPasswordToken = undefined;
        seller.resetPasswordExpires = undefined;
        await seller.save();

        // await sendResetSuccessEmail(seller.email);
        return res.status(200).json({success:true, message: 'Password reset successful' });
    } catch (error) {
        return res.status(400).json({success:false, message: error.message });
        
    }
}

export const checkSellerAuth = async(req, res) => {
    try {
        const seller = await Seller.findById(req.userId);
        if(!seller) {
            return res.status(400).json({success:false, message: 'Seller not found' });
        }
        return res.status(200).json({
            success:true, 
            message: 'Seller authenticated successfully', 
            seller: {
                firstname: seller.firstname,
                lastname: seller.lastname,
                email: seller.email,
                pnumber: seller.pnumber,
                company: seller.company,
                address: seller.address,
                isVerified: seller.isVerified
            } 
        });
    } catch (error) {
        return res.status(400).json({success:false, message: error.message });

    }
}