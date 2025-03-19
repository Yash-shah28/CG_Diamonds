import userModel from "../models/user.models.js";

const createUser = async({ firstname, lastname, email, password }, res) => {
    if(!firstname || !email || !password){
        res.status(400).json({message: "All fields are required! "})
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    return user
}

export default createUser