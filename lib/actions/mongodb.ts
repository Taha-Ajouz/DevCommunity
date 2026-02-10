// lib/connectDB.ts
import mongoose from 'mongoose';

declare global {
  // For Next.js hot reload: prevent multiple connections
  var mongoose:
    | {
        conn: mongoose.Mongoose | null;
        promise: Promise<mongoose.Mongoose> | null;
      }
    | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Initialize cached connection
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

let cached = global.mongoose;

async function connectDB(): Promise<mongoose.Mongoose> {
  // Return cached connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If there is no connection promise, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Avoid buffering commands until connected
    };
    // Non-null assertion ensures TypeScript knows this is string
    cached.promise = mongoose.connect(MONGODB_URI!, opts);
  }

  try {
    // Wait for the connection
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default connectDB;
