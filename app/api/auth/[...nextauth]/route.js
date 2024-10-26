import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose'
import User from '@/models/User'
import connectDb from '@/db/connectDb'

export const authOptions =  NextAuth({
  providers: [
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    {/*AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    // Passwordless / email sign in
    EmailProvider({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js <no-reply@example.com>'
    }),*/}
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      
      if(account.provider == "github" || account.provider == 'google' ){
        //connectDb
        await connectDb();
        // check user exists
        const currentUser = await User.findOne({email:user.email});
        if(!currentUser){
          const newUser = new User({
            email:user.email,
            username:user.email.split("@")[0],
          })
          await newUser.save();
        }
        return true;
      }
      return true;
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email:session.user.email})
      console.log("dbuser:",dbUser)
      session.user.name = dbUser.username
      return session
    },
  }
})

export {authOptions as GET, authOptions as POST}