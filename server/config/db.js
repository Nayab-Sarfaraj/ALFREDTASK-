import { config } from "dotenv";
import mongoose from "mongoose";
config();
console.log();
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("SUCCESSFULLY CONNECTED TO THE DATABASE");
    console.log();
  } catch (error) {
    console.log("ERROR CONNECTING TO THE DATABASE");
  
    throw new Error(error);
  }
};

export default connectToDB;
