import mongoose, { connect, mongo } from "mongoose";

const connectDb = async()=>{
    try {
        // connect the db
        const conn = await mongoose.connect(`mongodb://localhost:27017/Tea-time`,{
            useNewUrlParser:true
        })
        console.log("mongodb connected")
    } catch (error) {
        console.log(error.message)

    }
}

export default connectDb;