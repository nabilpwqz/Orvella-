import { MongoClient } from "mongodb";

export const client = new MongoClient(process.env.MONGODB_URI!);

export const database = client.db(process.env.DATABASE_NAME!);

export const connectDB = async () => {
  try {
    await client.connect();

    console.log("✅ MongoDB Connected");
    console.log("Database:", database.databaseName);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    process.exit(1);
  }
};
