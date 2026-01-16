import mongoose from "mongoose";
import { mustGetEnv } from "./env";

const uri = mustGetEnv("MONGODB_URI");
const dbName = process.env.MONGODB_DB;

let cached = (global as any).mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { dbName })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
