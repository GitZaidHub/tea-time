"use server";
import React from "react";
import jwt from "jsonwebtoken";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import bcrypt from 'bcryptjs';

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

