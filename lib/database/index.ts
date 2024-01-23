import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cahed = (global as any).mongoose || { conn: null, promise: null };


export const connectToDatabase = async () => {
  if (cahed.conn) return cahed.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cahed.promise =
    cahed.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "evently",
      bufferCommands: false,
    });

  cahed.conn = await cahed.promise;

  return cahed.conn;
};
