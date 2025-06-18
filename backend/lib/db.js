import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connection to database established ", con.connection.host);
  } catch (error) {
    console.log("connection to database failed ", error);
  }
};
