import  mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema ({
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
    token: {
        type: String
    }
})


userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password,10)
}


const userModel = mongoose.model('user',userSchema);
export default userModel;


