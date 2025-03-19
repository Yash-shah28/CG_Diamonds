import { connect } from "mongoose"

export const connectToDb = async() => {
    try {
        const connection = await connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("MongoDb Connected Successfully!!")
    } catch (error) {
        console.log(error)
    }
}