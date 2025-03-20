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
