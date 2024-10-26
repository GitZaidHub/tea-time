import mongoose, { model, Schema } from "mongoose";

const PaymentSchema = new Schema({
    name:{type:String , required:true},
    receiver:{type:String,required:true},
    oid:{type:String, required:true},
    message:{type:String,required:true},
    amount:{type:String, required:true},
    done:{type:Boolean , default:false},
} ,{timestamps:true})

export default mongoose.models.Payment || model("Payment",PaymentSchema);;