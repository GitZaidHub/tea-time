import mongoose, { connect, mongo } from "mongoose";

const connectDb = async () => {
  try {
    // connect the db
    const conn = await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
      }
    );
    console.log("mongodb connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
