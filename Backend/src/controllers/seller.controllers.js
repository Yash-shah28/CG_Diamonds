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

export const loginSeller = async(req,res,next) => {

    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

    const { email, password } = req.body;

    const user = await sellerModel.findOne({ email }).select('+password');

    if(!user){
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch =await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.status === 'Inactive') {
        return res.status(401).json({ message: 'Account is inactive. Wait for conformation.' });
    }
        
    const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET,{ expiresIn: '24h' });
    user.token = token;
    await user.save();
    return res.status(201).json({token: token});
}