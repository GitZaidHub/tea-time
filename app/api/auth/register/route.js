"use server";
import React from "react";
import jwt from "jsonwebtoken";
import connectDb from "@/db/connectDb";
import User from "@/models/User";
import bcrypt from 'bcryptjs';

export async function POST(req, res)  {
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
};

