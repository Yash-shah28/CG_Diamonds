import sellerModel from "../models/seller.models.js";

const createSeller = async({ firstname, lastname, email, password, pnumber }, res) => {
    if(!firstname || !email || !password || !pnumber){
        res.status(400).json({message: "All fields are required! "})
    }
    const seller = sellerModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        pnumber
    })
    return seller
}

export default createSeller