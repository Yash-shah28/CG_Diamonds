import mongoose from "mongoose";

export const connectToDb = async() => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("MongoDb Connected Successfully!!")
    } catch (error) {
        console.log("Error connection to MongoDb:",error.message)
        process.exit(1); 
    }
}