import mongoose from "mongoose";

const connectDb = (dbUri: string) => {
  mongoose.connect(dbUri, {});
};

export default connectDb;
