import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
    email:{type:String, required: true},
    name:{type:String},
    username:{type:String, required: true, unique: true },
    profilepic:{type:String},
    password:{type:String},
    coverpic:{type:String},
    razorpayId :{type:String},
    razorpaySecret:{type:String},
},{timestamps:true})

export default  mongoose.models.User || model("User" , UserSchema) 