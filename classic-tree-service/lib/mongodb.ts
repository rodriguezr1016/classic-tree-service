import mongoose from "mongoose";
import { mustGetEnv } from "./env";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache = globalForMongoose.mongoose ?? { conn: null, promise: null };

globalForMongoose.mongoose = cached;

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = mustGetEnv("MONGODB_URI");
    const dbName = process.env.MONGODB_DB;

    cached.promise = mongoose
      .connect(uri, { dbName })
      .then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
