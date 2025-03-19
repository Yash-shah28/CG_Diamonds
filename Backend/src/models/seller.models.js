import  mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const sellerSchema = new Schema ({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3,'First name must be at least 3 Character long'],

        },
        lastname: {
            type: String,

        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5,'Email  must be at least 5 Character long'],

    },
    password: {
        type: String,
        required: true,
        select: false
    },
    pnumber: {
        type: Number,
        required: true,
        minlength: [10, 'Phone number must be at least 10 digits long'],
        maxlength: [15, 'Phone number must be at most 15 digits long']
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Inactive'
    },
    token: {
        type: String
    }
})


sellerSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password,10)
}


const sellerModel = mongoose.model('seller',sellerSchema);
export default sellerModel;


