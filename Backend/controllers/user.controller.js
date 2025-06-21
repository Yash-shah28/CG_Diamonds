import bcrypt from "bcryptjs";
import crypto from 'crypto';

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        if (!name || !email || !password) {
            throw new Error("All Fields are required");
        }

        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ success: true, message: "User with this email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken: verificationToken,
            verificationExpires: Date.now() + 24 * 60 * 60 * 1000
        })

        await user.save();

        // if required to generate the token we can

        // mail for the verification token

        return res.status(200).json({
            success: true,
            message: "User Registered Successfully ",
            user: {
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        })

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            throw new Error("All Fields are required");
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Logging Successfull",
            user: {
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })

    }
}

export const logout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}

export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        if (!code) {
            throw new Error("Please Enter verification code");
        }
        const user = await User.findOne({
            verificationToken: code,
            verificationExpires: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired Verification Code" });
        }
        user.isVerified = true,
            user.verificationExpires = undefined,
            user.verificationToken = undefined,
            await user.save();

        // Send welcome email

        return res.status(200).json({
            success: true,
            message: " Email Verified Successfully",
            user: {
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }

}

export const checkAuth = async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({
            success: true,
            message: 'User authenticated successfully',
            user: {
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });

    }
}
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            throw new Error("Email field is Required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status.json({ success: false, message: "User with this email does not exists" });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordExpires = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetPasswordExpires;
        await user.save();

        // send reset password link to the mail
        return res.status(200).json({ success: true, message: "Password reset link send to your mail" });


    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });

    }
}

export const resetPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired Password reset token" });
        }

        const hasedPassword = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.password = hasedPassword;
        user.resetPasswordExpires = undefined;
        await user.save();

        // send reset password success mail

        return res.status(200).json({ success: true, message: 'Password reset successful' });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}
