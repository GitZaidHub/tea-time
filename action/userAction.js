"use server";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";
// https://prod.liveshare.vsengsaas.visualstudio.com/join?7D4C03A2E1E07035ED6193728225B6FDF809
export const initiate = async (amount, receiver, paymentform) => {
  await connectDb();
  let user = await User.findOne({username:receiver})
  const secret = user.razorpaySecret;

  var instance = new Razorpay({ key_id: user.razorpayId, key_secret: secret })

  let options = {
    amount: Number.parseInt(amount),
    currency:"INR",
  }
  let x;
  try {
    x = await instance.orders.create(options);
  } catch (error) {
    console.error("Razorpay Order Creation Error: ", error);
    throw new Error("Order creation failed");
  }

  // Save the payment details in the database
  await Payment.create({
    oid: x.id, // Razorpay Order ID
    amount: amount/100,
    receiver: receiver,
    name: paymentform.name,
    message: paymentform.message
  });

  return x;
};

export const fetchUser = async(username)=>{
  await connectDb();
  let u = await User.findOne({username:username})
  console.log(u)
  // Check if user is found
  if (!u) {
    throw new Error("User not found");
  }
  let user = u.toObject({flattenObjectIds : true})
  return user;
}

export const fetchUsers = async()=>{
  await connectDb();
  let u = await User.find();
  return u;
  
}

export const fetchPayment = async (username) => {
  await connectDb();

  let payments = await Payment.find({ receiver: username, done: true }).limit(7).lean();
  
  // Sort in JavaScript by converting amount to a number
  payments.sort((a, b) => Number(b.amount) - Number(a.amount));

  return payments;
};

export const updateProfile = async (data, oldusername, oldemail) => {
  await connectDb();
  let ndata = data;

  if (oldusername !== ndata.username || oldemail !== ndata.email) {
    return { error: "You are not allowed to change username/email" };
  } else {
    await User.updateOne({ email: ndata.email }, ndata);
    return {}; // Return an empty object or some success message if needed
  }
};
