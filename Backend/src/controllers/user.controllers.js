import userModel from '../models/user.models.js'
import createUser from '../services/user.services.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator'

export const registerUser = async(req,res,next) =>{
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array().map(err => err.msg) });
        }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if(isUserAlreadyExist){
        return res.status(400).json({message: "Email already exist"});
    }

    const hashPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email: email,
        password: hashPassword
    },res)
    res.status(201).json({user})
}

export const loginUser = async(req,res,next) => {

    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if(!user){
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log(user)

    const isMatch =await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(401).json({ message: 'Invalid email or password' });
    }
        const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET,{ expiresIn: '24h' });
        user.token = token;
        await user.save();
        return res.status(201).json({token: token});
}