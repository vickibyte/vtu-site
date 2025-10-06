import mongoose from "mongoose";

const MMONGODB_URI = process.env.MONGODB_URI as string;

if (!MMONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB () {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MMONGODB_URI,{
        bufferCommands: false,
         }).then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
  }