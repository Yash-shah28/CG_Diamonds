import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    pnumber: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
       type: Boolean,
       default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    verificationExpires: Date,

},{timestamps: true});

export const Seller = mongoose.model("Seller", sellerSchema);
