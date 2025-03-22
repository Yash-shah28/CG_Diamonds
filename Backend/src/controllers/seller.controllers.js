import sellerModel from '../models/seller.models.js'
import createSeller from '../services/seller.services.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator'

export const registerSeller = async(req,res,next) =>{
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }

    const { fullname, email, password, pnumber } = req.body;

    const isUserAlreadyExist = await sellerModel.findOne({ email });

    if(isUserAlreadyExist){
        return res.status(400).json({message: "Email already exist"});
    }

    const hashPassword = await sellerModel.hashPassword(password);

    const user = await createSeller({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email: email,
        password: hashPassword,
        pnumber: pnumber
    },res)
    res.status(201).json({user})
}

export const loginSeller = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await sellerModel.findOne({ email }).select('+password');

        if(!user){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (user.status === 'Inactive') {
            return res.status(401).json({ message: 'Account is inactive. Wait for conformation.' });
        }

        // Create session
        req.session.seller = {
            id: user._id,
            email: user.email,
            fullname: user.fullname,
            status: user.status
        };
            
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        user.token = token;
        await user.save();
        
        return res.status(201).json({
            token: token,
            user: {
                email: user.email,
                fullname: user.fullname,
                status: user.status
            }
        });
    } catch (error) {
        next(error);
    }
}

// Add session check middleware
export const checkSellerSession = (req, res, next) => {
    console.log(req.session)
    if (!req.session.seller) {
        return res.status(401).json({ message: 'Unauthorized - Please login' });
    }
    next();
};

export const logoutSeller = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: 'Logged out successfully' });
    });
};

export const verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const seller = await sellerModel.findById(decoded.userId);
        
        if (!seller) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Check if the token matches the one stored in the database
        if (seller.token !== token) {
            return res.status(401).json({ message: 'Token expired' });
        }

        return res.status(200).json({
            seller: {
                email: seller.email,
                fullname: seller.fullname,
                pnumber: seller.pnumber,
                status: seller.status
            }
        });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const profileSeller = {
    // Get seller profile
    getProfile: async (req, res) => {
        try {
            
            console.log(res.locals.currentUser)
            const seller = await sellerModel.findById(req.seller.id);
            if (!seller) {
                return res.status(404).json({ success: false, message: 'Seller not found' });
            }

            res.status(200).json({
                success: true,
                seller: {
                    fullname: seller.fullname,
                    email: seller.email,
                    pnumber: seller.pnumber,
                    company: seller.company,
                    address: seller.address,
                    status: seller.status
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Update seller profile
    updateProfile: async (req, res) => {
        try {
            const { fullname, pnumber, company, address } = req.body;
            
            const seller = await sellerModel.findById(req.seller.userId);
            if (!seller) {
                return res.status(404).json({ success: false, message: 'Seller not found' });
            }

            // Update fields if provided
            if (fullname) seller.fullname = fullname;
            if (pnumber) seller.pnumber = pnumber;
            if (company) seller.company = company;
            if (address) seller.address = address;

            await seller.save();

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                seller: {
                    fullname: seller.fullname,
                    email: seller.email,
                    pnumber: seller.pnumber,
                    company: seller.company,
                    address: seller.address,
                    status: seller.status
                }
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    // Update seller password
    updatePassword: async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;

            // Validate input
            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password and new password are required'
                });
            }

            const seller = await sellerModel.findById(req.seller.userId).select('+password');
            if (!seller) {
                return res.status(404).json({ success: false, message: 'Seller not found' });
            }

            // Verify current password
            const isMatch = await bcrypt.compare(currentPassword, seller.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Current password is incorrect'
                });
            }

            // Hash new password
            const hashPassword = await sellerModel.hashPassword(newPassword);
            seller.password = hashPassword;
            await seller.save();

            res.status(200).json({
                success: true,
                message: 'Password updated successfully'
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};
