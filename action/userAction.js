"use server";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import bcrypt from 'bcryptjs';
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
  // Check if user is found
  if (!u) {
    console.log("User not found")
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
/*
export const Login = async (req, res) => {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { email, password } = req.body;
    await connectDb();
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: "Email does not exist" });
    }

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(401).json({ error: "Password does not match" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong during login" });
  }
};

export const Register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    await connectDb();

    const isUsernameExists = await User.findOne({ username });
    if (isUsernameExists) {
      return res.status(409).json({ error: "Username already exists" });
    }
    if(password.length < 6){
        return res.status(402).json({error:"password must be 6 length"})
    }
    const isEmailExists = await User.findOne({ email: email.toLowerCase() });
    if (isEmailExists) {
      return res.status(422).json({ error: "Email already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ error: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(201).json({ message: `New user ${newUser.email} registered successfully` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong during registration" });
  }
};*/